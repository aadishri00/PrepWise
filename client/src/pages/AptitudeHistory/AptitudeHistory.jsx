import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function AptitudeHistory() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const res = await api.get("/test-results/aptitude");
            setResults(res.data.results || []);
        } catch (error) {
            console.log("History error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getPercentage = (item) => {
        if (typeof item.percentage === "number") {
            return item.percentage;
        }

        if (item.totalQuestions > 0) {
            return (item.score / item.totalQuestions) * 100;
        }

        return 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading history...
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
                            Aptitude History
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View your previous aptitude tests.
                        </p>
                    </div>

                    <Link
                        to="/aptitude"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        New Test
                    </Link>

                </div>


                <div className="bg-white border rounded-xl">

                    {results.length === 0 ? (

                        <div className="p-8 text-center">

                            <p className="text-gray-400">
                                No tests completed yet.
                            </p>

                            <Link
                                to="/aptitude"
                                className="text-blue-600 font-medium"
                            >
                                Start Test →
                            </Link>

                        </div>

                    ) : (

                        results.map((item, index) => {

                            const percentage = Math.round(
                                getPercentage(item)
                            );

                            return (
                                <div
                                    key={index}
                                    className="p-5 border-b last:border-0 flex justify-between items-center"
                                >

                                    <div>
                                        <p className="font-bold">
                                            Aptitude Test #{results.length - index}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="text-right">

                                        <p className="text-xl font-bold text-blue-600">
                                            {percentage}%
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {item.score} / {item.totalQuestions}
                                        </p>

                                    </div>

                                </div>
                            );
                        })

                    )}

                </div>


                <Link
                    to="/dashboard"
                    className="inline-block mt-6 text-blue-600"
                >
                    ← Back to Dashboard
                </Link>

            </main>
        </div>
    );
}

export default AptitudeHistory;