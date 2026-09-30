import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Resume() {

    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadResume = async () => {

        if (!file) {
            alert("Please select PDF");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        try {

            setLoading(true);

            const res = await api.post(
                "/resume/upload",
                formData
            );

            localStorage.setItem(
                "resumeFileName",
                res.data.fileName
            );

            navigate("/resume-feedback");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <div className="max-w-xl mx-auto p-8">

                <div className="bg-white p-8 rounded-xl shadow">

                    <h1 className="text-2xl font-bold mb-2">
                        Resume Analyzer
                    </h1>

                    <p className="text-gray-500 mb-6">
                        Upload your resume and get AI ATS feedback.
                    </p>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        onClick={uploadResume}
                        disabled={loading}
                        className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg"
                    >
                        {loading
                            ? "Uploading..."
                            : "Analyze Resume"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Resume;