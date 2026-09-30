const express = require("express");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { spawn, execFile } = require("child_process");

const authMiddleware = require("../middleware/authMiddleware");

const CodingQuestion = require("../models/CodingQuestion");
const CodingResult = require("../models/CodingResult");

const router = express.Router();

const TIME_LIMIT = 3000;



// SUBMIT CODE


router.post(
    "/submit",
    authMiddleware,
    async (req, res) => {

        const {
            questionId,
            code,
            language = "java"
        } = req.body;


        // -----------------------------
        // VALIDATION
        // -----------------------------

        if (!questionId) {
            return res.status(400).json({
                message: "Question ID is required"
            });
        }

        if (!code || !code.trim()) {
            return res.status(400).json({
                message: "Code is required"
            });
        }


        try {

            // -----------------------------
            // GET QUESTION
            // -----------------------------

            const question =
                await CodingQuestion.findById(questionId);

            if (!question) {
                return res.status(404).json({
                    message: "Question not found"
                });
            }


            // -----------------------------
            // HIDDEN TEST CASES
            // -----------------------------

            const hiddenTests =
                question.hiddenTestCases || [];


            if (hiddenTests.length === 0) {

                return res.status(400).json({
                    message: "No hidden test cases available for this question"
                });

            }


            // -----------------------------
            // CREATE TEMP FOLDER
            // -----------------------------

            const folder = path.join(
                os.tmpdir(),
                crypto.randomUUID()
            );

            fs.mkdirSync(folder);


            // -----------------------------
            // FILE SETTINGS
            // -----------------------------

            let fileName;
            let compileCommand = null;
            let compileArgs = [];


            if (language === "java") {

                fileName = "Main.java";

                compileCommand = "javac";

                compileArgs = [
                    path.join(folder, fileName)
                ];

            }

            else if (language === "cpp") {

                fileName = "Main.cpp";

                compileCommand = "g++";

                compileArgs = [
                    path.join(folder, fileName),
                    "-o",
                    path.join(folder, "Main")
                ];

            }

            else if (language === "python") {

                fileName = "Main.py";

            }

            else if (language === "javascript") {

                fileName = "Main.js";

            }

            else {

                cleanup(folder);

                return res.status(400).json({
                    message: "Unsupported language"
                });

            }


            const codeFile =
                path.join(folder, fileName);


            fs.writeFileSync(
                codeFile,
                code
            );


            
            // COMPILE JAVA / C++
            

            if (
                language === "java" ||
                language === "cpp"
            ) {

                const compileResult =
                    await compileCode(
                        compileCommand,
                        compileArgs
                    );


                if (!compileResult.success) {

                    cleanup(folder);

                    const result =
                        await CodingResult.create({
                            user: req.user.userId,
                            question: questionId,
                            code,
                            passed: 0,
                            total: hiddenTests.length,
                            percentage: 0,
                            status: "COMPILATION_ERROR"
                        });


                    return res.json({

                        success: true,

                        result,

                        status: "COMPILATION_ERROR",

                        message: "Compilation Error",

                        passed: 0,

                        total: hiddenTests.length,

                        percentage: 0,

                        output: compileResult.output

                    });

                }

            }


            
            // RUN HIDDEN TESTS
            

            let passed = 0;

            let status = "ACCEPTED";

            let message = "All test cases passed";

            let failedOutput = "";


            for (
                let i = 0;
                i < hiddenTests.length;
                i++
            ) {

                const test =
                    hiddenTests[i];


                // -----------------------------
                // COMMAND
                // -----------------------------

                let command;
                let args;


                if (language === "java") {

                    command = "java";

                    args = [
                        "-cp",
                        folder,
                        "Main"
                    ];

                }

                else if (language === "cpp") {

                    command =
                        process.platform === "win32"
                            ? path.join(folder, "Main.exe")
                            : path.join(folder, "Main");

                    args = [];

                }

                else if (language === "python") {

                    command = "python";

                    args = [
                        codeFile
                    ];

                }

                else {

                    command = "node";

                    args = [
                        codeFile
                    ];

                }


                // -----------------------------
                // RUN PROGRAM
                // -----------------------------

                const runResult =
                    await runCode(
                        command,
                        args,
                        test.input,
                        TIME_LIMIT
                    );


                // -----------------------------
                // TIME LIMIT
                // -----------------------------

                if (runResult.status === "TLE") {

                    status = "TIME_LIMIT_EXCEEDED";

                    message =
                        `Time Limit Exceeded on test case ${i + 1}`;

                    failedOutput =
                        "Time Limit Exceeded";

                    break;

                }


                // -----------------------------
                // RUNTIME ERROR
                // -----------------------------

                if (runResult.status === "RE") {

                    status = "RUNTIME_ERROR";

                    message =
                        `Runtime Error on test case ${i + 1}`;

                    failedOutput =
                        runResult.output;

                    break;

                }


                // -----------------------------
                // WRONG ANSWER
                // -----------------------------

                const actualOutput =
                    normalizeOutput(
                        runResult.output
                    );

                const expectedOutput =
                    normalizeOutput(
                        test.expectedOutput
                    );


                if (
                    actualOutput !== expectedOutput
                ) {

                    status = "WRONG_ANSWER";

                    message =
                        `Wrong Answer on test case ${i + 1}`;

                    failedOutput =
                        `Expected: ${expectedOutput}\nActual: ${actualOutput}`;

                    break;

                }


                // -----------------------------
                // PASSED
                // -----------------------------

                passed++;

            }


            
            // PERCENTAGE
            

            const total =
                hiddenTests.length;


            const percentage =
                Math.round(
                    (passed / total) * 100
                );


            
            // ACCEPTED
            

            if (passed === total) {

                status = "ACCEPTED";

                message =
                    "All test cases passed";

            }


            
            // SAVE RESULT
            

            const result =
                await CodingResult.create({

                    user: req.user.userId,

                    question: questionId,

                    code,

                    passed,

                    total,

                    percentage,

                    status

                });


            
            // CLEANUP
            

            cleanup(folder);


            
            // RESPONSE
            

            return res.json({

                success: true,

                result,

                status,

                message,

                passed,

                total,

                percentage,

                output: failedOutput

            });


        }

        catch (error) {

            console.error(
                "Coding submit error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to submit code"

            });

        }

    }
);



// NORMALIZE OUTPUT


function normalizeOutput(output) {

    return String(output || "")
        .replace(/\r/g, "")
        .trim();

}



// COMPILE CODE


function compileCode(
    command,
    args
) {

    return new Promise((resolve) => {

        execFile(

            command,

            args,

            {
                timeout: TIME_LIMIT
            },

            (error, stdout, stderr) => {

                if (error) {

                    resolve({

                        success: false,

                        output:
                            stderr ||
                            stdout ||
                            error.message

                    });

                    return;

                }


                resolve({

                    success: true,

                    output: stdout

                });

            }

        );

    });

}



// RUN PROGRAM


function runCode(
    command,
    args,
    input,
    timeLimit
) {

    return new Promise((resolve) => {

        const child =
            spawn(
                command,
                args,
                {
                    windowsHide: true
                }
            );


        let output = "";

        let errorOutput = "";

        let finished = false;


        // -----------------------------
        // STDOUT
        // -----------------------------

        child.stdout.on(
            "data",
            (data) => {

                output +=
                    data.toString();

            }
        );


        // -----------------------------
        // STDERR
        // -----------------------------

        child.stderr.on(
            "data",
            (data) => {

                errorOutput +=
                    data.toString();

            }
        );


        // -----------------------------
        // INPUT
        // -----------------------------

        try {

            child.stdin.write(
                input || ""
            );

            child.stdin.end();

        }

        catch (error) {

            if (!finished) {

                finished = true;

                resolve({

                    status: "RE",

                    output: error.message

                });

            }

        }


        // -----------------------------
        // TIME LIMIT
        // -----------------------------

        const timer =
            setTimeout(() => {

                if (finished) {
                    return;
                }


                finished = true;


                child.kill();


                resolve({

                    status: "TLE",

                    output:
                        "Time Limit Exceeded"

                });

            }, timeLimit);


        // -----------------------------
        // PROCESS CLOSE
        // -----------------------------

        child.on(
            "close",
            (code) => {

                if (finished) {
                    return;
                }


                finished = true;


                clearTimeout(timer);


                if (code !== 0) {

                    resolve({

                        status: "RE",

                        output:
                            errorOutput ||
                            "Runtime Error"

                    });

                    return;

                }


                resolve({

                    status: "OK",

                    output

                });

            }
        );


        // -----------------------------
        // PROCESS ERROR
        // -----------------------------

        child.on(
            "error",
            (error) => {

                if (finished) {
                    return;
                }


                finished = true;


                clearTimeout(timer);


                resolve({

                    status: "RE",

                    output:
                        error.message

                });

            }
        );

    });

}



// HISTORY


router.get(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const results =
                await CodingResult
                    .find({
                        user: req.user.userId
                    })
                    .populate(
                        "question",
                        "title difficulty category"
                    )
                    .sort({
                        createdAt: -1
                    });


            res.json({
                results: results
            });

        }

        catch (error) {

            console.error(
                "Coding history error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to get coding history"

            });

        }

    }
);



// CLEANUP


function cleanup(folder) {

    try {

        if (fs.existsSync(folder)) {

            fs.rmSync(
                folder,
                {
                    recursive: true,
                    force: true
                }
            );

        }

    }

    catch (error) {

        console.error(
            "Cleanup error:",
            error.message
        );

    }

}


module.exports = router;