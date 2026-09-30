import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [aptitudeResults, setAptitudeResults] = useState([]);
    const [codingResults, setCodingResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [
                profileRes,
                aptitudeRes,
                codingRes
            ] = await Promise.all([
                api.get("/profile"),
                api.get("/test-results/aptitude"),
                api.get("/coding-results")
            ]);

            setProfile(
                profileRes.data.user ||
                profileRes.data
            );

            setAptitudeResults(
                aptitudeRes.data.results || []
            );

            setCodingResults(
                codingRes.data.results || []
            );

        } catch (error) {
            console.log(
                "Dashboard error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const getPercentage = (item) => {

        if (
            typeof item?.percentage === "number" &&
            !Number.isNaN(item.percentage)
        ) {
            return item.percentage;
        }

        if (
            typeof item?.score === "number" &&
            typeof item?.totalQuestions === "number" &&
            item.totalQuestions > 0
        ) {
            return (
                item.score /
                item.totalQuestions
            ) * 100;
        }

        if (
            typeof item?.passed === "number" &&
            typeof item?.total === "number" &&
            item.total > 0
        ) {
            return (
                item.passed /
                item.total
            ) * 100;
        }

        return 0;
    };

    const aptitudeAverage =
        aptitudeResults.length > 0
            ? aptitudeResults.reduce(
                (sum, item) =>
                    sum + getPercentage(item),
                0
            ) / aptitudeResults.length
            : 0;

    const codingAverage =
        codingResults.length > 0
            ? codingResults.reduce(
                (sum, item) =>
                    sum + getPercentage(item),
                0
            ) / codingResults.length
            : 0;

    const overallProgress =
        (aptitudeAverage + codingAverage) / 2;

    const recentActivity = [
        ...aptitudeResults.map(item => ({
            type: "Aptitude",
            title: "Aptitude Test",
            score: getPercentage(item),
            date: item.createdAt
        })),

        ...codingResults.map(item => ({
            type: "Coding",
            title:
                item.question?.title ||
                "Java Coding Test",
            score: getPercentage(item),
            date: item.createdAt
        }))
    ]
        .sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        )
        .slice(0, 5);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-gray-500 text-sm">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">

                {/* HERO */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl text-white p-5 sm:p-7 lg:p-8 mb-6 sm:mb-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div className="min-w-0">

                            <p className="text-blue-200 text-sm sm:text-base mb-2">
                                Welcome back
                            </p>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
                                {profile?.name || "Student"}
                            </h1>

                            <p className="text-blue-100 text-sm sm:text-base mt-3 max-w-xl leading-6">
                                Keep practicing, track your
                                progress and prepare yourself
                                for your next placement opportunity.
                            </p>

                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 w-full lg:w-auto lg:min-w-[180px]">

                            <p className="text-blue-100 text-sm">
                                Overall Progress
                            </p>

                            <p className="text-3xl sm:text-4xl font-bold mt-1">
                                {Math.round(overallProgress)}%
                            </p>

                            <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                                <div
                                    className="bg-white h-2 rounded-full transition-all duration-500"
                                    style={{
                                        width:
                                            `${Math.min(
                                                overallProgress,
                                                100
                                            )}%`
                                    }}
                                />
                            </div>

                        </div>

                    </div>

                </div>


                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">

                    <StatCard
                        title="Aptitude Average"
                        value={`${Math.round(
                            aptitudeAverage
                        )}%`}
                        subtitle={`${aptitudeResults.length} tests completed`}
                        icon="🧠"
                    />

                    <StatCard
                        title="Coding Average"
                        value={`${Math.round(
                            codingAverage
                        )}%`}
                        subtitle={`${codingResults.length} tests completed`}
                        icon="💻"
                    />

                    <StatCard
                        title="Aptitude Tests"
                        value={aptitudeResults.length}
                        subtitle="Practice sessions"
                        icon="📝"
                    />

                    <StatCard
                        title="Coding Tests"
                        value={codingResults.length}
                        subtitle="Java assessments"
                        icon="🚀"
                    />

                </div>


                {/* QUICK ACTIONS */}
                <section className="mb-6 sm:mb-8">

                    <div className="mb-4 sm:mb-5">

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            Quick Actions
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Continue your placement preparation
                        </p>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

                        <ActionCard
                            to="/aptitude"
                            icon="🧠"
                            title="Aptitude Test"
                            description="Practice quantitative, logical and verbal questions."
                        />

                        <ActionCard
                            to="/coding"
                            icon="💻"
                            title="Java Coding"
                            description="Solve coding problems and test your solutions."
                        />

                        <ActionCard
                            to="/resume"
                            icon="📄"
                            title="AI Resume Review"
                            description="Upload your resume and get AI-powered feedback."
                        />

                        <ActionCard
                            to="/interview"
                            icon="🎤"
                            title="Interview Prep"
                            description="Practice technical and HR interview questions."
                        />

                    </div>

                </section>


                {/* TWO COLUMNS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

                    {/* PREPARATION OVERVIEW */}
                    <div className="bg-white rounded-xl shadow-sm border p-5 sm:p-6">

                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                            Preparation Overview
                        </h2>

                        <p className="text-gray-500 text-sm mt-1 mb-6">
                            Your current performance
                        </p>

                        <ProgressRow
                            label="Aptitude"
                            value={aptitudeAverage}
                        />

                        <ProgressRow
                            label="Coding"
                            value={codingAverage}
                        />

                        <ProgressRow
                            label="Overall"
                            value={overallProgress}
                        />

                        <Link
                            to="/progress"
                            className="inline-flex items-center mt-4 sm:mt-6 text-blue-600 font-medium text-sm sm:text-base hover:underline"
                        >
                            View detailed progress →
                        </Link>

                    </div>


                    {/* RECENT ACTIVITY */}
                    <div className="bg-white rounded-xl shadow-sm border p-5 sm:p-6">

                        <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">

                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                    Recent Activity
                                </h2>

                                <p className="text-gray-500 text-sm mt-1">
                                    Your latest practice sessions
                                </p>

                            </div>

                            <Link
                                to="/progress"
                                className="text-blue-600 text-sm font-medium whitespace-nowrap"
                            >
                                View all
                            </Link>

                        </div>


                        <div className="mt-5">

                            {recentActivity.length === 0 ? (

                                <div className="text-center py-8">

                                    <div className="text-3xl mb-3">
                                        📊
                                    </div>

                                    <p className="text-gray-500 text-sm">
                                        No activity yet.
                                    </p>

                                    <Link
                                        to="/aptitude"
                                        className="text-blue-600 font-medium text-sm mt-2 inline-block"
                                    >
                                        Start your first test →
                                    </Link>

                                </div>

                            ) : (

                                recentActivity.map(
                                    (activity, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-3 py-4 border-b last:border-b-0"
                                        >

                                            <div className="flex items-center gap-3 min-w-0">

                                                <div className="w-10 h-10 flex-shrink-0 bg-blue-50 rounded-lg flex items-center justify-center">
                                                    {activity.type ===
                                                        "Aptitude"
                                                        ? "🧠"
                                                        : "💻"}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                                                        {activity.title}
                                                    </p>

                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {formatDate(
                                                            activity.date
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="text-right flex-shrink-0">

                                                <p className="font-bold text-blue-600 text-sm sm:text-base">
                                                    {Math.round(
                                                        activity.score
                                                    )}%
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    Score
                                                </p>

                                            </div>

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </div>

                </div>


                {/* BOTTOM CTA */}
                <div className="mt-6 sm:mt-8 bg-white border rounded-xl p-5 sm:p-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div className="min-w-0">

                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                Ready for your next challenge?
                            </h2>

                            <p className="text-gray-500 text-sm sm:text-base mt-1">
                                Practice consistently and improve your placement readiness.
                            </p>

                        </div>

                        <Link
                            to="/mock-interview"
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-center transition"
                        >
                            Start Mock Interview
                        </Link>

                    </div>

                </div>

            </main>

        </div>
    );
}


function StatCard({
    title,
    value,
    subtitle,
    icon
}) {

    return (
        <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">

            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <p className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900">
                        {value}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                        {subtitle}
                    </p>

                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 bg-blue-50 rounded-lg flex items-center justify-center text-lg sm:text-xl">
                    {icon}
                </div>

            </div>

        </div>
    );
}


function ActionCard({
    to,
    icon,
    title,
    description
}) {

    return (
        <Link
            to={to}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200"
        >

            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4">
                {icon}
            </div>

            <h3 className="font-bold text-base sm:text-lg text-gray-900">
                {title}
            </h3>

            <p className="text-gray-500 text-sm mt-2 leading-6">
                {description}
            </p>

            <p className="text-blue-600 text-sm font-medium mt-4">
                Start →
            </p>

        </Link>
    );
}


function ProgressRow({
    label,
    value
}) {

    const safeValue = Math.max(
        0,
        Math.min(
            Number(value) || 0,
            100
        )
    );

    return (
        <div className="mb-5">

            <div className="flex justify-between mb-2">

                <span className="font-medium text-gray-700 text-sm sm:text-base">
                    {label}
                </span>

                <span className="text-sm font-semibold">
                    {Math.round(safeValue)}%
                </span>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5">

                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{
                        width:
                            `${safeValue}%`
                    }}
                />

            </div>

        </div>
    );
}


function formatDate(date) {

    if (!date) {
        return "Recently";
    }

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "Recently";
    }

    return value.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}

export default Dashboard;