import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function ResumeFeedback() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [data, setData] =
        useState(null);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const analyzeResume =
            async () => {

                try {

                    const fileName =
                        localStorage.getItem(
                            "resumeFileName"
                        );

                    if (!fileName) {

                        setError(
                            "Resume not found"
                        );

                        setLoading(false);

                        return;
                    }

                    const response =
                        await api.post(
                            "/ai/resume-feedback",
                            {
                                fileName
                            }
                        );

                    setData(
                        response.data
                    );

                } catch (err) {

                    console.log(err);

                    setError(
                        err.response?.data?.message ||
                        "Resume analysis failed"
                    );

                } finally {

                    setLoading(false);
                }
            };

        analyzeResume();

    }, []);

    // LOADING

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

                    <h2 className="text-xl font-semibold">
                        Analyzing Resume...
                    </h2>

                    <p className="text-gray-500 mt-2">
                        AI is checking your resume carefully.
                    </p>

                </div>

            </div>
        );
    }

    // ERROR

    if (error) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="bg-white p-8 rounded-xl shadow text-center">

                    <h2 className="text-xl font-bold text-red-600">
                        Analysis Failed
                    </h2>

                    <p className="text-gray-600 mt-3">
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/resume")
                        }
                        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Upload Resume Again
                    </button>

                </div>

            </div>
        );
    }

    if (!data) {
        return null;
    }

    // DATA

    const breakdown =
        data.atsBreakdown || {};

    const maximum =
        data.breakdownMaximum || {};

    const projects =
        Array.isArray(data.projects)
            ? data.projects
            : [];

    const issues =
        Array.isArray(data.issues)
            ? data.issues
            : [];

    const strengths =
        Array.isArray(data.strengths)
            ? data.strengths
            : [];

    const suggestions =
        Array.isArray(data.suggestions)
            ? data.suggestions
            : [];

    const skills =
        Array.isArray(data.detectedSkills)
            ? data.detectedSkills
            : [];

    // SCORE COLOR

    const score =
        Number(data.atsScore || 0);

    const scoreColor =
        score >= 85
            ? "text-green-600"
            : score >= 75
                ? "text-blue-600"
                : score >= 65
                    ? "text-yellow-600"
                    : "text-red-600";

    // BREAKDOWN DATA

    const breakdownItems = [

        {
            name: "Contact",
            value: breakdown.contact,
            max: maximum.contact
        },

        {
            name: "Formatting",
            value: breakdown.formatting,
            max: maximum.formatting
        },

        {
            name: "Content",
            value: breakdown.content,
            max: maximum.content
        },

        {
            name: "Skills",
            value: breakdown.skills,
            max: maximum.skills
        },

        {
            name: "Experience",
            value: breakdown.experience,
            max: maximum.experience
        },

        {
            name: "Projects",
            value: breakdown.projects,
            max: maximum.projects
        },

        {
            name: "Problem Solving",
            value: breakdown.problemSolving,
            max: maximum.problemSolving
        },

        {
            name: "Education",
            value: breakdown.education,
            max: maximum.education
        },

        {
            name: "Language",
            value: breakdown.language,
            max: maximum.language
        },

        {
            name: "Readability",
            value: breakdown.readability,
            max: maximum.readability
        }
    ];

    // UI

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}

            <div className="bg-white border-b">

                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-bold">
                            Resume Feedback
                        </h1>

                        <p className="text-gray-500">
                            AI powered resume analysis
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/resume")
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Upload New
                    </button>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* SCORE */}

                <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">

                    <p className="text-gray-500 text-sm">
                        ATS Score
                    </p>

                    <div
                        className={`text-6xl font-bold mt-2 ${scoreColor}`}
                    >
                        {score}
                    </div>

                    <div className="text-gray-400">
                        /100
                    </div>

                    <p className="mt-3 text-lg font-semibold">
                        {data.rating}
                    </p>

                </div>

                {/* STRENGTHS */}

                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

                    <h2 className="text-xl font-bold mb-4">
                        💪 Strengths
                    </h2>

                    {strengths.length === 0 ? (

                        <p className="text-gray-500">
                            No major strengths detected.
                        </p>

                    ) : (

                        <div className="space-y-3">

                            {strengths.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="flex gap-3"
                                    >

                                        <span className="text-green-600">
                                            ✓
                                        </span>

                                        <span>
                                            {typeof item === "string"
                                                ? item
                                                : item.title ||
                                                item.description ||
                                                JSON.stringify(item)}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>
                    )}

                </div>

                {/* WEAKNESSES */}

                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

                    <h2 className="text-xl font-bold mb-4">
                        ⚠️ Weaknesses
                    </h2>

                    {issues.length === 0 ? (

                        <p className="text-green-600">
                            No major issues detected.
                        </p>

                    ) : (

                        <div className="space-y-5">

                            {issues.map(
                                (issue, index) => (

                                    <div
                                        key={index}
                                        className="border-b pb-4 last:border-b-0"
                                    >

                                        <h3 className="font-semibold">
                                            {issue.title}
                                        </h3>

                                        <p className="text-gray-600 mt-1">
                                            <b>
                                                Reason:
                                            </b>{" "}
                                            {issue.problem ||
                                                issue.reason}
                                        </p>

                                        {issue.fix && (

                                            <p className="text-gray-700 mt-2">
                                                <b>
                                                    Fix:
                                                </b>{" "}
                                                {issue.fix}
                                            </p>

                                        )}

                                    </div>

                                )
                            )}

                        </div>
                    )}

                </div>

                {/* SUMMARY */}

                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

                    <h2 className="text-xl font-bold mb-3">
                        📋 Summary
                    </h2>

                    <p className="text-gray-700 leading-7">
                        {data.summary}
                    </p>

                </div>

                {/* SUGGESTIONS */}

                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

                    <h2 className="text-xl font-bold mb-4">
                        💡 Suggestions
                    </h2>

                    {suggestions.length === 0 ? (

                        <p className="text-gray-500">
                            No additional suggestions.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {suggestions.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="border-l-4 border-blue-500 pl-4"
                                    >

                                        <p className="font-semibold">
                                            {item.problem}
                                        </p>

                                        <p className="text-gray-600 mt-1">
                                            {item.solution}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>
                    )}

                </div>

                {/* PROJECTS */}

                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

                    <h2 className="text-xl font-bold mb-2">
                        🛠️ Project Quality Analysis
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Projects are evaluated on technical depth,
                        problem solving, uniqueness, technical value
                        and resume quality.
                    </p>

                    {projects.length === 0 ? (

                        <p className="text-gray-500">
                            No projects detected.
                        </p>

                    ) : (

                        <div className="space-y-8">

                            {projects.map(
                                (project, index) => (

                                    <div
                                        key={index}
                                        className="border rounded-xl p-5"
                                    >

                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                            <div>

                                                <h3 className="text-lg font-bold">
                                                    {project.name}
                                                </h3>

                                                <p className="text-gray-500">
                                                    {project.type}
                                                </p>

                                            </div>

                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold">
                                                {project.level}
                                            </span>

                                        </div>

                                        {/* TECHNOLOGIES */}

                                        <div className="mt-5">

                                            <p className="font-semibold mb-2">
                                                Technologies
                                            </p>

                                            <div className="flex flex-wrap gap-2">

                                                {project.technologies?.map(
                                                    (tech, i) => (

                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                                        >
                                                            {tech}
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                        {/* SCORES */}

                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">

                                            <ProjectScore
                                                title="Technical Depth"
                                                value={project.technicalDepth}
                                                max={10}
                                            />

                                            <ProjectScore
                                                title="Problem Solving"
                                                value={project.problemSolving}
                                                max={5}
                                            />

                                            <ProjectScore
                                                title="Uniqueness"
                                                value={project.uniqueness}
                                                max={5}
                                            />

                                            <ProjectScore
                                                title="Resume Quality"
                                                value={project.resumeQuality}
                                                max={5}
                                            />

                                            <ProjectScore
                                                title="Technical Value"
                                                value={project.technicalValue}
                                                max={5}
                                            />

                                        </div>

                                        {/* STRENGTHS */}

                                        {project.strengths?.length > 0 && (

                                            <div className="mt-6">

                                                <h4 className="font-semibold mb-2">
                                                    Strengths
                                                </h4>

                                                <ul className="space-y-2">

                                                    {project.strengths.map(
                                                        (item, i) => (

                                                            <li
                                                                key={i}
                                                                className="text-gray-700"
                                                            >
                                                                ✓ {item}
                                                            </li>

                                                        )
                                                    )}

                                                </ul>

                                            </div>

                                        )}

                                        {/* WEAKNESSES */}

                                        {project.weaknesses?.length > 0 && (

                                            <div className="mt-5">

                                                <h4 className="font-semibold mb-2">
                                                    Weaknesses
                                                </h4>

                                                <ul className="space-y-2">

                                                    {project.weaknesses.map(
                                                        (item, i) => (

                                                            <li
                                                                key={i}
                                                                className="text-gray-700"
                                                            >
                                                                • {item}
                                                            </li>

                                                        )
                                                    )}

                                                </ul>

                                            </div>

                                        )}

                                        {/* IMPROVEMENTS */}

                                        {project.improvements?.length > 0 && (

                                            <div className="mt-5">

                                                <h4 className="font-semibold mb-2">
                                                    How to Improve
                                                </h4>

                                                <ul className="space-y-2">

                                                    {project.improvements.map(
                                                        (item, i) => (

                                                            <li
                                                                key={i}
                                                                className="text-gray-700"
                                                            >
                                                                → {item}
                                                            </li>

                                                        )
                                                    )}

                                                </ul>

                                            </div>

                                        )}

                                    </div>

                                )
                            )}

                        </div>
                    )}

                </div>

                {/* SKILLS */}

                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

                    <h2 className="text-xl font-bold mb-4">
                        🛠️ Detected Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {skills.map(
                            (skill, index) => (

                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                >
                                    {skill}
                                </span>

                            )
                        )}

                    </div>

                </div>

                {/* ATS BREAKDOWN */}

                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

                    <h2 className="text-xl font-bold mb-6">
                        📊 ATS Breakdown
                    </h2>

                    <div className="space-y-5">

                        {breakdownItems.map(
                            (item, index) => {

                                const value =
                                    Number(
                                        item.value || 0
                                    );

                                const max =
                                    Number(
                                        item.max || 1
                                    );

                                const percentage =
                                    Math.round(
                                        (
                                            value /
                                            max
                                        ) * 100
                                    );

                                return (

                                    <div
                                        key={index}
                                    >

                                        <div className="flex justify-between mb-2">

                                            <span className="font-medium">
                                                {item.name}
                                            </span>

                                            <span className="font-semibold">
                                                {value}/{max}
                                            </span>

                                        </div>

                                        <div className="w-full h-2 bg-gray-200 rounded-full">

                                            <div
                                                className="h-2 bg-blue-600 rounded-full"
                                                style={{
                                                    width:
                                                        `${percentage}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>

                </div>

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <button
                        onClick={() =>
                            navigate("/resume")
                        }
                        className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Upload New Resume
                    </button>

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="flex-1 px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                        Dashboard
                    </button>

                </div>

            </div>

        </div>
    );
}
// PROJECT SCORE COMPONEN

function ProjectScore({
    title,
    value,
    max
}) {

    return (
        <div className="bg-gray-50 rounded-lg p-3">

            <p className="text-xs text-gray-500">
                {title}
            </p>

            <p className="text-lg font-bold mt-1">
                {value}/{max}
            </p>

        </div>
    );
}

export default ResumeFeedback;