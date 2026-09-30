import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Aptitude() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [time, setTime] = useState(20 * 60);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    useEffect(() => {
        if (result || loading) return;

        if (time <= 0) {
            submitTest();
            return;
        }

        const timer = setInterval(() => {
            setTime((t) => t - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time, loading, result]);

    const loadQuestions = async () => {
        try {
            const res = await api.get("/questions/test");

            const data =
                res.data.questions ||
                res.data.results ||
                res.data;

            setQuestions(
                Array.isArray(data) ? data : []
            );

        } catch (error) {
            console.log("Questions error:", error);
        } finally {
            setLoading(false);
        }
    };

    const selectAnswer = (answer) => {
        setAnswers({
            ...answers,
            [current]: answer
        });
    };

    const submitTest = async () => {
        if (result) return;

        let score = 0;

        questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        });

        const percentage = questions.length
            ? (score / questions.length) * 100
            : 0;

        try {
            await api.post("/test-results", {
                score,
                totalQuestions: questions.length,
                percentage,
                category: "Aptitude"
            });
        } catch (error) {
            console.log("Result save error:", error);
        }

        setResult({
            score,
            percentage
        });
    };

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    // LOADING
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>

                    <p className="text-gray-500">
                        Loading test...
                    </p>

                </div>
            </div>
        );
    }

    // NO QUESTIONS
    if (!questions.length) {
        return (
            <div className="min-h-screen bg-gray-50">

                <Navbar />

                <div className="max-w-xl mx-auto p-6 text-center">

                    <div className="bg-white border rounded-xl p-8">

                        <h2 className="text-xl font-bold">
                            No questions available
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Please try again later.
                        </p>

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
        return (
            <div className="min-h-screen bg-gray-50">

                <Navbar />

                <main className="max-w-xl mx-auto p-6">

                    <div className="bg-white border rounded-xl p-8 text-center">

                        <h1 className="text-3xl font-bold">
                            Test Completed
                        </h1>

                        <p className="text-5xl font-bold text-blue-600 my-6">
                            {Math.round(result.percentage)}%
                        </p>

                        <p className="text-gray-600">
                            Score: {result.score} / {questions.length}
                        </p>

                        <div className="flex flex-col gap-3 mt-8">

                            <Link
                                to="/aptitude-history"
                                className="bg-blue-600 text-white py-3 rounded-lg"
                            >
                                View History
                            </Link>

                            <button
                                onClick={() =>
                                    window.location.reload()
                                }
                                className="border py-3 rounded-lg"
                            >
                                Take Another Test
                            </button>

                            <Link
                                to="/dashboard"
                                className="border py-3 rounded-lg"
                            >
                                ← Dashboard
                            </Link>

                        </div>

                    </div>

                </main>

            </div>
        );
    }

    const question = questions[current];

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-4xl mx-auto p-6">

                <div className="flex justify-between items-center mb-6">

                    <Link
                        to="/dashboard"
                        className="text-blue-600 font-medium"
                    >
                        ← Dashboard
                    </Link>

                    <div className="font-bold text-red-600">
                        Time: {formatTime()}
                    </div>

                </div>

                <div className="bg-white border rounded-xl p-6">

                    <div className="flex justify-between mb-6">

                        <p className="font-medium">
                            Question {current + 1} / {questions.length}
                        </p>

                        <p className="text-gray-500">
                            {question.category}
                        </p>

                    </div>

                    <h2 className="text-xl font-bold mb-6">
                        {question.question}
                    </h2>

                    <div className="space-y-3">

                        {question.options.map(
                            (option, index) => (

                                <button
                                    key={index}
                                    onClick={() =>
                                        selectAnswer(option)
                                    }
                                    className={`w-full text-left p-4 border rounded-lg ${answers[current] === option
                                            ? "border-blue-600 bg-blue-50"
                                            : "hover:bg-gray-50"
                                        }`}
                                >
                                    {option}
                                </button>

                            )
                        )}

                    </div>

                    <div className="flex justify-between mt-8">

                        <button
                            disabled={current === 0}
                            onClick={() =>
                                setCurrent(current - 1)
                            }
                            className="border px-5 py-2 rounded-lg disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {current === questions.length - 1 ? (

                            <button
                                onClick={submitTest}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg"
                            >
                                Submit Test
                            </button>

                        ) : (

                            <button
                                onClick={() =>
                                    setCurrent(current + 1)
                                }
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                            >
                                Next
                            </button>

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Aptitude;