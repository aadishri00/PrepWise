const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const javaFolder = path.join(__dirname, "../java");
const javaFile = path.join(javaFolder, "Main.java");


// Compile Java code
const compileJavaCode = (code) => {

    fs.writeFileSync(
        javaFile,
        code
    );

    try {

        execFileSync(
            "javac",
            [javaFile],
            {
                encoding: "utf8",
                timeout: 5000
            }
        );

        return true;

    } catch (error) {

        console.log(
            "JAVA COMPILATION ERROR:",
            error.stderr || error.message
        );

        throw (
            error.stderr ||
            error.message
        );
    }
};


// Run compiled Java code
const runCompiledJavaCode = (input = "") => {

    try {

        const output =
            execFileSync(
                "java",
                [
                    "-cp",
                    javaFolder,
                    "Main"
                ],
                {
                    input: input,
                    encoding: "utf8",
                    timeout: 3000
                }
            );

        return output;

    } catch (error) {

        console.log(
            "JAVA EXECUTION ERROR:",
            error.stderr ||
            error.message
        );

        throw (
            error.stderr ||
            error.message
        );
    }
};


module.exports = {
    compileJavaCode,
    runCompiledJavaCode
};