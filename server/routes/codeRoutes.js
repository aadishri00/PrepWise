const express = require("express");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { spawn, execFile } = require("child_process");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// RUN COD

router.post("/run", authMiddleware, async (req, res) => {

    const {
        code,
        input = "",
        language = "java"
    } = req.body;


    if (!code || !code.trim()) {

        return res.status(400).json({
            message: "Code is required"
        });

    }


    const folder = path.join(
        os.tmpdir(),
        crypto.randomUUID()
    );


    try {

        fs.mkdirSync(folder);


        let fileName;
        let command;
        let args;



        // JAVA


        if (language === "java") {

            fileName = "Main.java";

            command = "javac";

            args = [
                path.join(folder, fileName)
            ];

        }



        // C++


        else if (language === "cpp") {

            fileName = "Main.cpp";

            command = "g++";

            args = [
                path.join(folder, fileName),
                "-o",
                path.join(folder, "Main")
            ];

        }



        // PYTHON


        else if (language === "python") {

            fileName = "Main.py";

        }



        // JAVASCRIPT


        else if (language === "javascript") {

            fileName = "Main.js";

        }


        else {

            return res.status(400).json({
                message: "Unsupported language"
            });

        }


        const codeFile = path.join(
            folder,
            fileName
        );


        fs.writeFileSync(
            codeFile,
            code
        );



        // PYTHON


        if (language === "python") {

            runProgram(
                "python",
                [codeFile],
                input,
                folder,
                res
            );

            return;
        }



        // JAVASCRIPT


        if (language === "javascript") {

            runProgram(
                "node",
                [codeFile],
                input,
                folder,
                res
            );

            return;
        }



        // COMPILE JAVA / C++


        execFile(
            command,
            args,
            (error, stdout, stderr) => {

                if (error) {

                    cleanup(folder);

                    return res.json({
                        success: false,
                        output:
                            stderr ||
                            error.message
                    });

                }


        
                // RUN JAVA
        

                if (language === "java") {

                    runProgram(
                        "java",
                        [
                            "-cp",
                            folder,
                            "Main"
                        ],
                        input,
                        folder,
                        res
                    );

                    return;
                }


        
                // RUN C++
        

                if (language === "cpp") {

                    runProgram(
                        path.join(
                            folder,
                            "Main.exe"
                        ),
                        [],
                        input,
                        folder,
                        res
                    );

                }

            }
        );

    } catch (error) {

        cleanup(folder);

        return res.status(500).json({
            success: false,
            message: "Unable to run code"
        });

    }

});

// RUN PROGRA

function runProgram(
    command,
    args,
    input,
    folder,
    res
) {

    const process = spawn(
        command,
        args,
        {
            windowsHide: true
        }
    );


    let output = "";
    let errorOutput = "";
    let finished = false;


    process.stdout.on(
        "data",
        (data) => {
            output += data.toString();
        }
    );


    process.stderr.on(
        "data",
        (data) => {
            errorOutput += data.toString();
        }
    );


    // Send input
    process.stdin.write(input || "");
    process.stdin.end();


    // 5 seconds
    const timer = setTimeout(() => {

        if (finished) {
            return;
        }

        finished = true;

        process.kill();

        cleanup(folder);

        return res.json({
            success: false,
            output: "Time Limit Exceeded"
        });

    }, 5000);


    process.on(
        "close",
        (code) => {

            if (finished) {
                return;
            }

            finished = true;

            clearTimeout(timer);

            cleanup(folder);


            if (code !== 0) {

                return res.json({
                    success: false,
                    output:
                        errorOutput ||
                        "Runtime Error"
                });

            }


            return res.json({
                success: true,
                output
            });

        }
    );


    process.on(
        "error",
        (error) => {

            if (finished) {
                return;
            }

            finished = true;

            clearTimeout(timer);

            cleanup(folder);

            return res.json({
                success: false,
                output: error.message
            });

        }
    );

}

// DELETE TEMP FOLDE

function cleanup(folder) {

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


module.exports = router;