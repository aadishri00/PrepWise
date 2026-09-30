import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function MockInterview() {

    const [type, setType] =
        useState("Technical Interview");

    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [questionNumber, setQuestionNumber] =
        useState(0);

    const [feedback, setFeedback] =
        useState(null);

    const [scores, setScores] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [listening, setListening] =
        useState(false);

    const [started, setStarted] =
        useState(false);

    const [finished, setFinished] =
        useState(false);

    const [previousQuestions, setPreviousQuestions] =
        useState([]);

    const recognitionRef =
        useRef(null);



    // START INTERVIEW


    const startInterview = async () => {

        try {

            setLoading(true);
            setFeedback(null);
            setScores([]);
            setFinished(false);
            setAnswer("");
            setPreviousQuestions([]);

            const response =
                await api.post(
                    "/mock-interview/start",
                    { type }
                );

            const firstQuestion =
                response.data.question;

            setQuestion(firstQuestion);
            setQuestionNumber(1);
            setStarted(true);

            setPreviousQuestions([
                firstQuestion
            ]);

            speak(firstQuestion);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to start interview"
            );

        } finally {

            setLoading(false);
        }
    };



    // AI SPEAK


    const speak = (text) => {

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.lang = "en-US";
        speech.rate = 0.9;

        window.speechSynthesis.speak(speech);
    };



    // START SPEAKING


    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert(
                "Speech recognition is not supported. Please use Google Chrome."
            );

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setListening(true);
            setAnswer("");
        };

        recognition.onresult = (event) => {

            const text =
                event.results[0][0].transcript;

            setAnswer(text);
            setListening(false);
        };

        recognition.onerror = () => {

            setListening(false);

            alert(
                "Could not recognize your voice."
            );
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current =
            recognition;

        recognition.start();
    };



    // STOP SPEAKING


    const stopListening = () => {

        if (recognitionRef.current) {

            recognitionRef.current.stop();
            setListening(false);
        }
    };



    // SUBMIT ANSWER


    const submitAnswer = async () => {

        if (!answer.trim()) {

            alert(
                "Please speak your answer first."
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/mock-interview/answer",
                    {
                        type,
                        question,
                        answer,
                        questionNumber,
                        previousQuestions
                    }
                );

            const result =
                response.data;


            // Save score
            const newScores = [
                ...scores,
                result
            ];

            setScores(newScores);
            setFeedback(result);


            // Interview finished
            if (
                questionNumber >= 5 ||
                !result.nextQuestion
            ) {

                setFinished(true);
                setStarted(false);

                return;
            }


            // Next question
            const nextQuestion =
                result.nextQuestion;

            setQuestion(nextQuestion);

            setQuestionNumber(
                questionNumber + 1
            );

            setAnswer("");

            setPreviousQuestions([
                ...previousQuestions,
                nextQuestion
            ]);

            speak(nextQuestion);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to evaluate answer"
            );

        } finally {

            setLoading(false);
        }
    };



    // OVERALL SCORE


    const getOverallScore = () => {

        if (!scores.length) {
            return 0;
        }

        let total = 0;

        scores.forEach((item) => {

            total +=
                item.technicalKnowledge;

            total +=
                item.communication;

            total +=
                item.relevance;
        });

        return Math.round(
            (total / (scores.length * 30)) * 100
        );
    };



    // CLEANUP


    useEffect(() => {

        return () => {

            window.speechSynthesis.cancel();

            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };

    }, []);



    // FINAL RESULT


    if (finished) {

        const overall =
            getOverallScore();


        const technical =
            Math.round(
                scores.reduce(
                    (sum, item) =>
                        sum +
                        item.technicalKnowledge,
                    0
                ) / scores.length * 10
            );


        const communication =
            Math.round(
                scores.reduce(
                    (sum, item) =>
                        sum +
                        item.communication,
                    0
                ) / scores.length * 10
            );


        const relevance =
            Math.round(
                scores.reduce(
                    (sum, item) =>
                        sum +
                        item.relevance,
                    0
                ) / scores.length * 10
            );


        return (
            <div className="min-h-screen bg-gray-50">

                <Navbar />

                <main className="max-w-3xl mx-auto p-6">

                    <div className="bg-white border rounded-2xl p-8 text-center">

                        <div className="text-5xl mb-4">
                            🎤
                        </div>

                        <h1 className="text-3xl font-bold">
                            AI Mock Interview Completed
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Your interview performance
                        </p>


                        <div className="text-6xl font-bold text-blue-600 my-8">
                            {overall}%
                        </div>


                        <div className="grid md:grid-cols-3 gap-4">

                            <ScoreCard
                                title="Technical"
                                value={technical}
                            />

                            <ScoreCard
                                title="Communication"
                                value={communication}
                            />

                            <ScoreCard
                                title="Relevance"
                                value={relevance}
                            />

                        </div>


                        <div className="text-left mt-8">

                            <h2 className="text-xl font-bold mb-4">
                                AI Feedback
                            </h2>

                            {scores.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="border rounded-lg p-4 mb-3"
                                    >

                                        <p className="font-semibold">
                                            Question {index + 1}
                                        </p>

                                        <p className="text-gray-600 mt-2">
                                            {item.feedback}
                                        </p>

                                        <p className="text-sm text-blue-600 mt-2">
                                            Improve:{" "}
                                            {item.improvement}
                                        </p>

                                    </div>
                                )
                            )}

                        </div>


                        <div className="flex flex-col gap-3 mt-8">

                            <button
                                onClick={() => {

                                    setFinished(false);
                                    setStarted(false);
                                    setQuestion("");
                                    setAnswer("");
                                    setFeedback(null);
                                    setScores([]);
                                    setQuestionNumber(0);
                                    setPreviousQuestions([]);

                                }}
                                className="bg-blue-600 text-white py-3 rounded-lg"
                            >
                                Take Another Interview
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



    // MAIN PAGE


    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-4xl mx-auto p-6">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        AI Mock Interview
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Practice a real interview with AI.
                    </p>

                </div>


                {!started ? (

                    <div className="bg-white border rounded-2xl p-8">

                        <h2 className="text-xl font-bold mb-6">
                            Choose Interview Type
                        </h2>


                        <select
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3 mb-6"
                        >

                            <option>
                                Technical Interview
                            </option>

                            <option>
                                HR Interview
                            </option>

                            <option>
                                MERN Developer Interview
                            </option>

                            <option>
                                Java Developer Interview
                            </option>

                        </select>


                        <button
                            onClick={startInterview}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
                        >
                            {loading
                                ? "Starting..."
                                : "Start AI Interview"}
                        </button>

                    </div>

                ) : (

                    <div className="space-y-6">


                        {/* QUESTION */}

                        <div className="bg-white border rounded-2xl p-8">

                            <div className="flex justify-between mb-6">

                                <span className="text-sm text-gray-500">
                                    Question {questionNumber} / 5
                                </span>

                                <span className="text-sm text-blue-600">
                                    {type}
                                </span>

                            </div>


                            <h2 className="text-2xl font-bold leading-relaxed">
                                {question}
                            </h2>


                            <button
                                onClick={() =>
                                    speak(question)
                                }
                                className="mt-5 border px-4 py-2 rounded-lg"
                            >
                                🔊 Hear Question
                            </button>

                        </div>


                        {/* ANSWER */}

                        <div className="bg-white border rounded-2xl p-8">

                            <h2 className="text-xl font-bold mb-4">
                                Your Answer
                            </h2>


                            {!answer ? (

                                <p className="text-gray-500 mb-5">
                                    🎤 Click "Start Speaking"
                                    and answer the question.
                                </p>

                            ) : (

                                <div className="bg-gray-50 border rounded-lg p-4 mb-5">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Your spoken answer:
                                    </p>

                                    <p className="text-gray-800">
                                        {answer}
                                    </p>
                                </div>
                            )}


                            <div className="flex gap-3">

                                {!listening ? (

                                    <button
                                        onClick={startListening}
                                        disabled={loading}
                                        className="bg-red-500 text-white px-5 py-3 rounded-lg"
                                    >
                                        🎤 Start Speaking
                                    </button>

                                ) : (

                                    <button
                                        onClick={stopListening}
                                        className="bg-gray-700 text-white px-5 py-3 rounded-lg"
                                    >
                                        ⏹ Stop
                                    </button>

                                )}


                                <button
                                    onClick={submitAnswer}
                                    disabled={
                                        loading ||
                                        !answer
                                    }
                                    className="bg-blue-600 text-white px-5 py-3 rounded-lg disabled:opacity-50"
                                >
                                    {loading
                                        ? "AI Evaluating..."
                                        : "Submit Answer"}
                                </button>

                            </div>


                            {listening && (

                                <p className="text-red-500 mt-4">
                                    🔴 Listening... Speak now
                                </p>

                            )}

                        </div>


                        {/* FEEDBACK */}

                        {feedback && (

                            <div className="bg-white border rounded-2xl p-8">

                                <h2 className="text-xl font-bold mb-5">
                                    AI Feedback
                                </h2>


                                <div className="grid md:grid-cols-3 gap-4">

                                    <ScoreCard
                                        title="Technical"
                                        value={
                                            feedback.technicalKnowledge * 10
                                        }
                                    />

                                    <ScoreCard
                                        title="Communication"
                                        value={
                                            feedback.communication * 10
                                        }
                                    />

                                    <ScoreCard
                                        title="Relevance"
                                        value={
                                            feedback.relevance * 10
                                        }
                                    />

                                </div>


                                <div className="mt-6">

                                    <p className="font-semibold">
                                        Feedback
                                    </p>

                                    <p className="text-gray-600 mt-2">
                                        {feedback.feedback}
                                    </p>


                                    <p className="font-semibold mt-5">
                                        Improvement
                                    </p>

                                    <p className="text-gray-600 mt-2">
                                        {feedback.improvement}
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                )}

            </main>

        </div>
    );
}



// SCORE CARD


function ScoreCard({ title, value }) {

    return (

        <div className="bg-gray-50 border rounded-xl p-5 text-center">

            <p className="text-gray-500">
                {title}
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
                {value}%
            </p>

        </div>
    );
}


export default MockInterview;