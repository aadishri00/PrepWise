import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function ResumeFeedback() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const called = useRef(false);

    useEffect(() => {

        if (called.current) return;

        called.current = true;

        const analyzeResume = async () => {

            try {

                const fileName = localStorage.getItem("resumeFileName");

                if (!fileName) {
                    setError("Resume not found. Please upload your resume again.");
                    setLoading(false);
                    return;
                }

                const response = await api.post(
                    "/ai/resume-feedback",
                    { fileName }
                );

                setData(response.data);

            } catch (err) {

                console.log("Resume feedback error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to analyze resume."
                );

            } finally {

                setLoading(false);
            }
        };

        analyzeResume();

    }, []);

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <div className="text-5xl mb-4">🤖</div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Analyzing Resume...
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Gemini AI is checking your resume
                        </p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                    <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
                        <div className="text-5xl mb-4">❌</div>

                        <h2 className="text-xl font-bold text-red-600">
                            Analysis Failed
                        </h2>

                        <p className="text-gray-600 mt-3">
                            {error}
                        </p>

                        <button
                            onClick={() => navigate("/resume")}
                            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            Upload Resume Again
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-8 px-4">

                <div className="max-w-6xl mx-auto">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-800">
                            🤖 AI Resume Analysis
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Your resume has been analyzed by Gemini AI.
                        </p>

                    </div>


                    {/* ATS Score */}

                    <div className="bg-white rounded-xl shadow-md p-8 mb-6">

                        <div className="grid md:grid-cols-2 gap-8 items-center">

                            <div>

                                <h2 className="text-xl font-bold text-gray-700">
                                    ATS Score
                                </h2>

                                <div className="text-6xl font-bold text-blue-600 mt-3">
                                    {data?.atsScore || 0}
                                    <span className="text-2xl text-gray-400">
                                        /100
                                    </span>
                                </div>

                                <p className="text-lg font-semibold text-gray-600 mt-3">
                                    {data?.rating || "Not available"}
                                </p>

                            </div>


                            <div>

                                <h3 className="font-bold text-gray-700 mb-3">
                                    ATS Breakdown
                                </h3>

                                <div className="space-y-3">

                                    {Object.entries(
                                        data?.atsBreakdown || {}
                                    ).map(([key, value]) => (

                                        <div key={key}>

                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="capitalize">
                                                    {key}
                                                </span>

                                                <span>
                                                    {value}/100
                                                </span>
                                            </div>

                                            <div className="w-full bg-gray-200 rounded-full h-2">

                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${value}%`
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Summary */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            📋 Overall Summary
                        </h2>

                        <p className="text-gray-600 leading-7">
                            {data?.summary || "No summary available."}
                        </p>

                    </div>


                    {/* Strengths */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                        <h2 className="text-xl font-bold text-green-700 mb-4">
                            ✅ Strengths
                        </h2>

                        {data?.strengths?.length > 0 ? (

                            <ul className="space-y-3">

                                {data.strengths.map((item, index) => (

                                    <li
                                        key={index}
                                        className="bg-green-50 p-4 rounded-lg text-gray-700"
                                    >
                                        <span className="font-semibold">
                                            ✓
                                        </span>{" "}
                                        {typeof item === "string"
                                            ? item
                                            : item?.issue || JSON.stringify(item)}
                                    </li>

                                ))}

                            </ul>

                        ) : (

                            <p className="text-gray-500">
                                No specific strengths detected.
                            </p>

                        )}

                    </div>


                    {/* Weaknesses */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                        <h2 className="text-xl font-bold text-red-700 mb-4">
                            ⚠️ Weaknesses / Issues
                        </h2>

                        {data?.weaknesses?.length > 0 ? (

                            <div className="space-y-4">

                                {data.weaknesses.map((item, index) => (

                                    <div
                                        key={index}
                                        className="bg-red-50 p-4 rounded-lg"
                                    >

                                        <p className="font-semibold text-red-800">
                                            {typeof item === "string"
                                                ? item
                                                : item?.issue || "Issue detected"}
                                        </p>

                                        {typeof item === "object" &&
                                            item?.reason && (

                                                <p className="text-gray-600 mt-2">
                                                    <b>Evidence:</b>{" "}
                                                    {item.reason}
                                                </p>

                                            )}

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <p className="text-gray-500">
                                No major weaknesses detected.
                            </p>

                        )}

                    </div>


                    {/* Suggestions */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                        <h2 className="text-xl font-bold text-blue-700 mb-4">
                            💡 AI Suggestions
                        </h2>

                        {data?.suggestions?.length > 0 ? (

                            <div className="space-y-4">

                                {data.suggestions.map((item, index) => (

                                    <div
                                        key={index}
                                        className="bg-blue-50 p-4 rounded-lg"
                                    >

                                        <p className="font-semibold text-blue-800">
                                            {typeof item === "string"
                                                ? item
                                                : item?.problem || "Improvement"}
                                        </p>

                                        {typeof item === "object" &&
                                            item?.solution && (

                                                <p className="text-gray-600 mt-2">
                                                    <b>Solution:</b>{" "}
                                                    {item.solution}
                                                </p>

                                            )}

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <p className="text-gray-500">
                                No specific suggestions detected.
                            </p>

                        )}

                    </div>


                    {/* Detected Skills */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            🛠️ Detected Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {data?.detectedSkills?.length > 0 ? (

                                data.detectedSkills.map((skill, index) => (

                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {typeof skill === "string"
                                            ? skill
                                            : JSON.stringify(skill)}
                                    </span>

                                ))

                            ) : (

                                <p className="text-gray-500">
                                    No skills detected.
                                </p>

                            )}

                        </div>

                    </div>


                    {/* Sections */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            📑 Resume Sections
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {data?.sections?.length > 0 ? (

                                data.sections.map((section, index) => (

                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {typeof section === "string"
                                            ? section
                                            : JSON.stringify(section)}
                                    </span>

                                ))

                            ) : (

                                <p className="text-gray-500">
                                    No section information available.
                                </p>

                            )}

                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="flex flex-wrap gap-4 justify-center">

                        <button
                            onClick={() => navigate("/resume")}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            📄 Analyze Another Resume
                        </button>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                        >
                            🏠 Dashboard
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ResumeFeedback;