import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const languages = {
    java: {
        name: "Java",
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // Write your code here

    }
}`
    },

    cpp: {
        name: "C++",
        starter: `#include <bits/stdc++.h>
using namespace std;

int main() {

    // Write your code here

    return 0;
}`
    },

    python: {
        name: "Python",
        starter: `# Write your code here

`
    },

    javascript: {
        name: "JavaScript",
        starter: `// Write your code here

`
    }
};


function Coding() {

    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);

    const [language, setLanguage] = useState("java");

    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [runMessage, setRunMessage] = useState("");
    const [runError, setRunError] = useState("");

    const [result, setResult] = useState(null);



    // LOAD QUESTIONS


    useEffect(() => {
        loadQuestions();
    }, []);


    const loadQuestions = async () => {

        try {

            const res = await api.get(
                "/coding-questions/test?limit=5"
            );

            const data =
                res.data.questions ||
                res.data.results ||
                res.data;

            setQuestions(
                Array.isArray(data) ? data : []
            );

        } catch (error) {

            console.log(
                "Coding questions error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    const question = questions[current];



    // SET STARTER CODE


    useEffect(() => {

        if (!question) {
            return;
        }

        setCode(
            languages[language].starter
        );

        setInput(
            question.sampleInput ||
            question.input ||
            ""
        );

        setOutput("");
        setRunMessage("");
        setRunError("");

    }, [current, language, question]);



    // CHANGE LANGUAGE


    const changeLanguage = (newLanguage) => {

        setLanguage(newLanguage);

        setOutput("");
        setRunMessage("");
        setRunError("");
    };


    // RUN CODE


    const runCode = async () => {

        if (!code.trim()) {

            setRunError(
                "Please write code first."
            );

            return;
        }

        try {

            setRunning(true);

            setOutput("");
            setRunMessage("");
            setRunError("");

            const res = await api.post(
                "/code/run",
                {
                    code,
                    input,
                    language
                }
            );


            if (!res.data.success) {

                setRunError(
                    res.data.output ||
                    res.data.message ||
                    "Code execution failed."
                );

                return;
            }


            setOutput(
                res.data.output ||
                "No output"
            );

            setRunMessage(
                "Code executed successfully."
            );

        } catch (error) {

            setRunError(
                error.response?.data?.message ||
                "Code execution failed."
            );

        } finally {

            setRunning(false);

        }
    };



    // SUBMIT CODE


    const submitCode = async () => {

        if (!code.trim()) {

            setRunError(
                "Please write code first."
            );

            return;
        }

        try {

            setSubmitting(true);

            setRunMessage("");
            setRunError("");
            setOutput("");

            const res = await api.post(
                "/coding-results/submit",
                {
                    questionId: question._id,
                    code,
                    language
                }
            );

            setResult(
                res.data.result ||
                res.data
            );

        } catch (error) {

            setRunError(
                error.response?.data?.message ||
                "Submission failed."
            );

        } finally {

            setSubmitting(false);

        }
    };



    // LOADING


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Loading coding test...
                </p>
            </div>
        );
    }


    if (!questions.length) {

        return (
            <div className="min-h-screen bg-gray-50">

                <Navbar />

                <div className="max-w-xl mx-auto p-6 text-center">

                    <div className="bg-white border rounded-xl p-8">

                        <h2 className="text-xl font-bold">
                            No coding questions available
                        </h2>

                        <Link
                            to="/dashboard"
                            className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            ← Dashboard
                        </Link>

                    </div>

                </div>

            </div>
        );
    }



    // RESULT


    if (result) {

        const percentage =
            result.percentage ??
            (
                result.total
                    ? (result.passed / result.total) * 100
                    : 0
            );

        return (
            <div className="min-h-screen bg-gray-50">

                <Navbar />

                <main className="max-w-xl mx-auto p-6">

                    <div className="bg-white border rounded-xl p-8 text-center">

                        <div className="text-5xl mb-4">
                            🎉
                        </div>

                        <h1 className="text-3xl font-bold">
                            Coding Test Completed
                        </h1>

                        <p className="text-5xl font-bold text-blue-600 my-6">
                            {Math.round(percentage)}%
                        </p>

                        <p className="text-gray-600">
                            Passed: {result.passed || 0} /{" "}
                            {result.total || 0}
                        </p>

                        <div className="flex flex-col gap-3 mt-8">

                            <Link
                                to="/coding-history"
                                className="bg-blue-600 text-white py-3 rounded-lg"
                            >
                                View History
                            </Link>

                            <a
                                href="/coding"
                                className="border py-3 rounded-lg text-center"
                            >
                                Take Another Test
                            </a>

                            <Link
                                to="/dashboard"
                                className="border py-3 rounded-lg text-center"
                            >
                                ← Dashboard
                            </Link>

                        </div>

                    </div>

                </main>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

                {/* TOP */}

                <div className="flex justify-between items-center mb-5">

                    <Link
                        to="/dashboard"
                        className="text-blue-600 font-medium"
                    >
                        ← Dashboard
                    </Link>

                    <p className="font-bold">
                        Question {current + 1} /{" "}
                        {questions.length}
                    </p>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                    {/* QUESTION */}

                    <div className="bg-white border rounded-xl p-6">

                        <p className="text-blue-600 font-medium">
                            {question.category || "Programming"}
                        </p>

                        <div className="flex justify-between items-center gap-3">

                            <h1 className="text-2xl font-bold mt-2">
                                {question.title}
                            </h1>

                            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                                {question.difficulty}
                            </span>

                        </div>

                        <p className="text-gray-600 mt-5 whitespace-pre-line leading-6">
                            {question.description ||
                                question.statement}
                        </p>


                        {question.input && (
                            <div className="mt-5">

                                <h3 className="font-bold">
                                    Input
                                </h3>

                                <p className="text-gray-600 mt-1 whitespace-pre-line">
                                    {question.input}
                                </p>

                            </div>
                        )}


                        {question.output && (
                            <div className="mt-5">

                                <h3 className="font-bold">
                                    Output
                                </h3>

                                <p className="text-gray-600 mt-1 whitespace-pre-line">
                                    {question.output}
                                </p>

                            </div>
                        )}


                        <div className="mt-5">

                            <h3 className="font-bold">
                                Sample Input
                            </h3>

                            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-sm whitespace-pre-wrap">
                                {question.sampleInput ||
                                    question.input ||
                                    "No sample input"}
                            </pre>

                        </div>


                        <div className="mt-5">

                            <h3 className="font-bold">
                                Sample Output
                            </h3>

                            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-sm whitespace-pre-wrap">
                                {question.sampleOutput ||
                                    question.output ||
                                    "No sample output"}
                            </pre>

                        </div>

                    </div>


                    {/* EDITOR */}

                    <div className="bg-white border rounded-xl p-6">

                        {/* LANGUAGE */}

                        <div className="flex justify-between items-center mb-3">

                            <h2 className="font-bold">
                                Code Editor
                            </h2>

                            <select
                                value={language}
                                onChange={(e) =>
                                    changeLanguage(e.target.value)
                                }
                                className="border rounded-lg px-3 py-2 outline-none"
                            >

                                <option value="java">
                                    Java
                                </option>

                                <option value="cpp">
                                    C++
                                </option>

                                <option value="python">
                                    Python
                                </option>

                                <option value="javascript">
                                    JavaScript
                                </option>

                            </select>

                        </div>


                        {/* TIP */}

                        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-3 text-sm">

                            💡 <b>Tip:</b> Write your solution
                            inside the marked section.
                            <br />

                            Do not change the required program structure.

                        </div>


                        {/* CODE */}

                        <textarea
                            value={code}
                            onChange={(e) => {

                                setCode(e.target.value);

                                setRunMessage("");
                                setRunError("");

                            }}
                            className="w-full h-80 border rounded-lg p-4 font-mono text-sm bg-gray-950 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                            spellCheck="false"
                        />


                        {/* INPUT */}

                        <label className="block text-sm font-semibold mt-4 mb-1">
                            Custom Input
                        </label>

                        <textarea
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            placeholder="Enter input..."
                            className="w-full border rounded-lg p-3 h-24 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                        />


                        {/* BUTTONS */}

                        <div className="flex gap-3 mt-4">

                            <button
                                onClick={runCode}
                                disabled={
                                    running ||
                                    submitting
                                }
                                className="border px-5 py-2.5 rounded-lg disabled:opacity-50"
                            >
                                {running
                                    ? "Running..."
                                    : "Run Code"}
                            </button>


                            <button
                                onClick={submitCode}
                                disabled={
                                    submitting ||
                                    running
                                }
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg disabled:opacity-50"
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit"}
                            </button>

                        </div>


                        {/* MESSAGE */}

                        {runMessage && (
                            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                ✓ {runMessage}
                            </div>
                        )}


                        {runError && (
                            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg whitespace-pre-wrap">
                                {runError}
                            </div>
                        )}


                        {/* OUTPUT */}

                        {output && (
                            <div className="mt-5">

                                <h3 className="font-bold mb-2">
                                    Output
                                </h3>

                                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
                                    {output}
                                </pre>

                            </div>
                        )}

                    </div>

                </div>


                {/* NAVIGATION */}

                <div className="flex justify-between mt-6">

                    <button
                        disabled={current === 0}
                        onClick={() => {
                            setCurrent(current - 1);
                        }}
                        className="border px-5 py-2 rounded-lg disabled:opacity-40"
                    >
                        Previous
                    </button>


                    {current < questions.length - 1 && (

                        <button
                            onClick={() => {
                                setCurrent(current + 1);
                            }}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Next
                        </button>

                    )}

                </div>

            </main>

        </div>
    );
}

export default Coding;