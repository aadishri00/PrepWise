import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Interview() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-5xl mx-auto p-6">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Interview Preparation
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Prepare for technical and HR interviews.
                        </p>
                    </div>

                    <Link
                        to="/dashboard"
                        className="text-blue-600 font-medium"
                    >
                        ← Dashboard
                    </Link>

                </div>


                <div className="grid md:grid-cols-3 gap-6">


                    {/* Technical */}

                    <Link
                        to="/technical-interview"
                        className="bg-white border rounded-xl p-6 hover:shadow-md"
                    >
                        <div className="text-3xl mb-4">
                            💻
                        </div>

                        <h2 className="text-xl font-bold">
                            Technical Interview
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Practice Java, JavaScript, React,
                            Node.js, MongoDB and DBMS questions.
                        </p>

                        <p className="text-blue-600 font-medium mt-5">
                            Start Practice →
                        </p>
                    </Link>


                    {/* HR */}

                    <Link
                        to="/hr-interview"
                        className="bg-white border rounded-xl p-6 hover:shadow-md"
                    >
                        <div className="text-3xl mb-4">
                            🗣️
                        </div>

                        <h2 className="text-xl font-bold">
                            HR Interview
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Practice common HR and behavioral
                            interview questions.
                        </p>

                        <p className="text-blue-600 font-medium mt-5">
                            Start Practice →
                        </p>
                    </Link>


                    {/* Mock */}

                    <Link
                        to="/mock-interview"
                        className="bg-white border rounded-xl p-6 hover:shadow-md"
                    >
                        <div className="text-3xl mb-4">
                            🎯
                        </div>

                        <h2 className="text-xl font-bold">
                            Mock Interview
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Take a complete interview practice
                            session.
                        </p>

                        <p className="text-blue-600 font-medium mt-5">
                            Start Mock Interview →
                        </p>
                    </Link>

                </div>

            </main>
        </div>
    );
}

export default Interview;