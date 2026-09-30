import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function HRInterview() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const res = await api.get("/interview?category=HR");

            setQuestions(
                Array.isArray(res.data)
                    ? res.data
                    : res.data.questions || []
            );
        } catch (error) {
            console.log("HR interview error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading questions...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto p-6">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            HR Interview
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Practice common HR interview questions.
                        </p>
                    </div>

                    <Link
                        to="/interview"
                        className="text-blue-600 font-medium"
                    >
                        ← Interview
                    </Link>

                </div>


                <div className="space-y-5">

                    {questions.length === 0 ? (

                        <div className="bg-white border rounded-xl p-8 text-center">
                            <p className="text-gray-500">
                                No HR questions available.
                            </p>
                        </div>

                    ) : (

                        questions.map((item, index) => (

                            <div
                                key={item._id || index}
                                className="bg-white border rounded-xl p-6"
                            >

                                <p className="text-sm text-blue-600 font-medium mb-2">
                                    Question {index + 1}
                                </p>

                                <h2 className="text-lg font-bold">
                                    {item.question}
                                </h2>

                                <details className="mt-4">

                                    <summary className="cursor-pointer text-blue-600 font-medium">
                                        Show Answer
                                    </summary>

                                    <p className="text-gray-600 mt-3 whitespace-pre-line">
                                        {item.answer}
                                    </p>

                                </details>

                            </div>

                        ))

                    )}

                </div>


                <Link
                    to="/interview"
                    className="inline-block mt-6 text-blue-600"
                >
                    ← Back to Interview
                </Link>

            </main>
        </div>
    );
}

export default HRInterview;