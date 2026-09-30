import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Progress() {
    const [aptitude, setAptitude] = useState([]);
    const [coding, setCoding] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const [aptitudeRes, codingRes] = await Promise.all([
                api.get("/test-results/aptitude"),
                api.get("/coding-results")
            ]);

            setAptitude(aptitudeRes.data.results || []);
            setCoding(codingRes.data.results || []);
        } catch (error) {
            console.log("Progress error:", error);
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

        if (item.total > 0) {
            return (item.passed / item.total) * 100;
        }

        return 0;
    };

    const getAverage = (results) => {
        if (!results.length) return 0;

        const total = results.reduce(
            (sum, item) => sum + getPercentage(item),
            0
        );

        return Math.round(total / results.length);
    };

    const aptitudeAverage = getAverage(aptitude);
    const codingAverage = getAverage(coding);

    const allResults = [...aptitude, ...coding];

    const overallAverage = getAverage(allResults);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading progress...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-6xl mx-auto p-6">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Progress
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track your placement preparation progress.
                        </p>
                    </div>

                    <Link
                        to="/dashboard"
                        className="text-blue-600 font-medium"
                    >
                        ← Dashboard
                    </Link>

                </div>


                {/* Stats */}

                <div className="grid md:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white border rounded-xl p-6">
                        <p className="text-gray-500">
                            Overall Average
                        </p>

                        <h2 className="text-4xl font-bold text-blue-600 mt-2">
                            {overallAverage}%
                        </h2>
                    </div>


                    <div className="bg-white border rounded-xl p-6">
                        <p className="text-gray-500">
                            Aptitude Average
                        </p>

                        <h2 className="text-4xl font-bold text-green-600 mt-2">
                            {aptitudeAverage}%
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            {aptitude.length} tests completed
                        </p>
                    </div>


                    <div className="bg-white border rounded-xl p-6">
                        <p className="text-gray-500">
                            Coding Average
                        </p>

                        <h2 className="text-4xl font-bold text-purple-600 mt-2">
                            {codingAverage}%
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            {coding.length} tests completed
                        </p>
                    </div>

                </div>


                {/* Preparation Overview */}

                <div className="bg-white border rounded-xl p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Preparation Overview
                    </h2>


                    <div className="space-y-6">

                        <div>

                            <div className="flex justify-between mb-2">

                                <span className="font-medium">
                                    Aptitude
                                </span>

                                <span>
                                    {aptitudeAverage}%
                                </span>

                            </div>

                            <div className="h-3 bg-gray-200 rounded-full">

                                <div
                                    className="h-3 bg-green-500 rounded-full"
                                    style={{
                                        width: `${aptitudeAverage}%`
                                    }}
                                />

                            </div>

                        </div>


                        <div>

                            <div className="flex justify-between mb-2">

                                <span className="font-medium">
                                    Coding
                                </span>

                                <span>
                                    {codingAverage}%
                                </span>

                            </div>

                            <div className="h-3 bg-gray-200 rounded-full">

                                <div
                                    className="h-3 bg-purple-500 rounded-full"
                                    style={{
                                        width: `${codingAverage}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* Quick Links */}

                <div className="grid md:grid-cols-2 gap-5 mt-8">

                    <Link
                        to="/aptitude-history"
                        className="bg-white border rounded-xl p-6 hover:shadow-md"
                    >
                        <h3 className="font-bold text-lg">
                            Aptitude History
                        </h3>

                        <p className="text-gray-500 mt-2">
                            View all your aptitude test results.
                        </p>
                    </Link>


                    <Link
                        to="/coding-history"
                        className="bg-white border rounded-xl p-6 hover:shadow-md"
                    >
                        <h3 className="font-bold text-lg">
                            Coding History
                        </h3>

                        <p className="text-gray-500 mt-2">
                            View all your coding test results.
                        </p>
                    </Link>

                </div>

            </main>
        </div>
    );
}

export default Progress;