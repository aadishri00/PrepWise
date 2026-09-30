import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AptitudePractice() {

    const topics = [
        ["🔢", "Quantitative Aptitude"],
        ["🧠", "Logical Reasoning"],
        ["📚", "Verbal Ability"],
        ["📊", "Data Interpretation"]
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-6xl mx-auto p-5 md:p-8">

                <h1 className="text-3xl font-bold">
                    Aptitude Practice
                </h1>

                <p className="text-gray-500 mb-7">
                    Choose a topic and start practicing.
                </p>

                <div className="grid md:grid-cols-2 gap-5">

                    {topics.map(([icon, title]) => (

                        <div
                            key={title}
                            className="bg-white p-7 rounded-xl shadow"
                        >
                            <div className="text-4xl">{icon}</div>

                            <h2 className="text-xl font-bold mt-4">
                                {title}
                            </h2>

                            <p className="text-gray-500 my-3">
                                Practice placement questions.
                            </p>

                            <Link
                                to="/aptitude"
                                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
                            >
                                Start →
                            </Link>
                        </div>

                    ))}

                </div>

            </main>

        </div>
    );
}

export default AptitudePractice;