import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Admin() {

    const navigate = useNavigate();

    // main = main admin page
    // aptitude = aptitude questions
    // coding = coding questions
    const [page, setPage] = useState("main");

    const [data, setData] = useState(null);
    const [users, setUsers] = useState([]);

    const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
    const [codingQuestions, setCodingQuestions] = useState([]);

    const [showAptitudeForm, setShowAptitudeForm] = useState(false);
    const [showCodingForm, setShowCodingForm] = useState(false);

    const [loading, setLoading] = useState(true);


    
    // FORM DATA
    
    const [aptitude, setAptitude] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        category: "Quantitative"
    });


    const [coding, setCoding] = useState({
        title: "",
        description: "",
        difficulty: "Easy",
        category: "Java",
        input: "",
        output: "",
        starterCode: "",
        hiddenInput: "",
        hiddenOutput: ""
    });


    // LOAD DATA
   

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            const dashboard =
                await api.get("/admin/dashboard");

            const users =
                await api.get("/admin/users");

            const aptitude =
                await api.get("/admin/aptitude-questions");

            const coding =
                await api.get("/admin/coding-questions");


            setData(dashboard.data.stats);

            setUsers(users.data.users || []);

            setAptitudeQuestions(
                aptitude.data.questions || []
            );

            setCodingQuestions(
                coding.data.questions || []
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };


   
    // LOGOUT
   

    const logout = async () => {

        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.log(error);
        }

        sessionStorage.removeItem("loggedIn");

        navigate("/login");
    };


   
    // DELETE USER
    
    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) {
            return;
        }

        await api.delete(`/admin/users/${id}`);

        loadData();
    };



    // MAKE ADMIN
    
    const makeAdmin = async (id) => {

        if (!window.confirm("Make this user admin?")) {
            return;
        }

        await api.put(
            `/admin/users/${id}/make-admin`
        );

        loadData();
    };


    
    // ADD APTITUDE
    

    const addAptitude = async (e) => {

        e.preventDefault();

        const options = [
            aptitude.option1,
            aptitude.option2,
            aptitude.option3,
            aptitude.option4
        ];

        if (
            !aptitude.question ||
            options.some(option => !option) ||
            !aptitude.correctAnswer
        ) {

            alert("Please fill all fields");

            return;
        }


        try {

            await api.post(
                "/admin/aptitude-questions",
                {
                    question: aptitude.question,
                    options: options,
                    correctAnswer: aptitude.correctAnswer,
                    category: aptitude.category
                }
            );


            alert("Question added");


            setAptitude({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correctAnswer: "",
                category: "Quantitative"
            });


            setShowAptitudeForm(false);

            loadData();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to add question"
            );

        }
    };


    
    // DELETE APTITUDE
    

    const deleteAptitude = async (id) => {

        if (!window.confirm("Delete this question?")) {
            return;
        }

        await api.delete(
            `/admin/aptitude-questions/${id}`
        );

        loadData();
    };


    
    // ADD CODING
    
    const addCoding = async (e) => {

        e.preventDefault();


        if (
            !coding.title ||
            !coding.description ||
            !coding.hiddenInput ||
            !coding.hiddenOutput
        ) {

            alert("Please fill required fields");

            return;
        }


        try {

            await api.post(
                "/admin/coding-questions",
                {
                    title: coding.title,
                    description: coding.description,
                    difficulty: coding.difficulty,
                    category: coding.category,
                    input: coding.input,
                    output: coding.output,
                    starterCode: coding.starterCode,

                    hiddenTestCases: [
                        {
                            input: coding.hiddenInput,
                            expectedOutput:
                                coding.hiddenOutput
                        }
                    ]
                }
            );


            alert("Coding question added");


            setCoding({
                title: "",
                description: "",
                difficulty: "Easy",
                category: "Java",
                input: "",
                output: "",
                starterCode: "",
                hiddenInput: "",
                hiddenOutput: ""
            });


            setShowCodingForm(false);

            loadData();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to add question"
            );

        }
    };


  
    // DELETE CODING
   

    const deleteCoding = async (id) => {

        if (!window.confirm("Delete this question?")) {
            return;
        }

        await api.delete(
            `/admin/coding-questions/${id}`
        );

        loadData();
    };


    
    // LOADING

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading Admin Panel...</p>
            </div>
        );
    }


    
    // APTITUDE PAGE


    if (page === "aptitude") {

        return (

            <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">

                        <div>

                            <button
                                onClick={() => setPage("main")}
                                className="text-blue-600 mb-2"
                            >
                                ← Back
                            </button>

                            <h1 className="text-3xl font-bold">
                                🧠 Aptitude Questions
                            </h1>

                            <p className="text-gray-500">
                                {aptitudeQuestions.length} Questions
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                setShowAptitudeForm(
                                    !showAptitudeForm
                                )
                            }
                            className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full sm:w-auto"
                        >
                            + Add Question
                        </button>

                    </div>


                    {/* ADD FORM */}

                    {showAptitudeForm && (

                        <form
                            onSubmit={addAptitude}
                            className="bg-white p-6 rounded-xl shadow mb-6"
                        >

                            <h2 className="text-xl font-bold mb-4">
                                Add Aptitude Question
                            </h2>


                            <input
                                placeholder="Question"
                                value={aptitude.question}
                                onChange={(e) =>
                                    setAptitude({
                                        ...aptitude,
                                        question: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <input
                                placeholder="Option 1"
                                value={aptitude.option1}
                                onChange={(e) =>
                                    setAptitude({
                                        ...aptitude,
                                        option1: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <input
                                placeholder="Option 2"
                                value={aptitude.option2}
                                onChange={(e) =>
                                    setAptitude({
                                        ...aptitude,
                                        option2: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <input
                                placeholder="Option 3"
                                value={aptitude.option3}
                                onChange={(e) =>
                                    setAptitude({
                                        ...aptitude,
                                        option3: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <input
                                placeholder="Option 4"
                                value={aptitude.option4}
                                onChange={(e) =>
                                    setAptitude({
                                        ...aptitude,
                                        option4: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <select
                                value={aptitude.correctAnswer}
                                onChange={(e) =>
                                    setAptitude({
                                        ...aptitude,
                                        correctAnswer: e.target.value
                                    })
                                }
                                className="input"
                            >

                                <option value="">
                                    Select Correct Answer
                                </option>

                                <option value={aptitude.option1}>
                                    Option 1
                                </option>

                                <option value={aptitude.option2}>
                                    Option 2
                                </option>

                                <option value={aptitude.option3}>
                                    Option 3
                                </option>

                                <option value={aptitude.option4}>
                                    Option 4
                                </option>

                            </select>


                            <select
                                value={aptitude.category}
                                onChange={(e) =>
                                    setAptitude({
                                        ...aptitude,
                                        category: e.target.value
                                    })
                                }
                                className="input"
                            >

                                <option value="Quantitative">
                                    Quantitative
                                </option>

                                <option value="Logical">
                                    Logical
                                </option>

                                <option value="Verbal">
                                    Verbal
                                </option>

                                <option value="DI">
                                    Data Interpretation
                                </option>

                            </select>


                            <button
                                className="bg-green-600 text-white px-5 py-3 rounded-lg"
                            >
                                Save Question
                            </button>

                        </form>
                    )}


                    {/* QUESTIONS */}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {aptitudeQuestions.map(
                            (question, index) => (

                                <div
                                    key={question._id}
                                    className="bg-white p-5 rounded-xl shadow"
                                >

                                    <div className="flex justify-between">

                                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                            Q{index + 1}
                                        </span>

                                        <button
                                            onClick={() =>
                                                deleteAptitude(
                                                    question._id
                                                )
                                            }
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>

                                    </div>


                                    <p className="font-semibold mt-4">
                                        {question.question}
                                    </p>


                                    <p className="text-gray-500 text-sm mt-3">
                                        Category:{" "}
                                        {question.category}
                                    </p>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>
        );
    }


    // CODING PAGE
    

    if (page === "coding") {

        return (

            <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">

                        <div>

                            <button
                                onClick={() => setPage("main")}
                                className="text-blue-600 mb-2"
                            >
                                ← Back
                            </button>

                            <h1 className="text-3xl font-bold">
                                💻 Coding Questions
                            </h1>

                            <p className="text-gray-500">
                                {codingQuestions.length} Questions
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                setShowCodingForm(
                                    !showCodingForm
                                )
                            }
                            className="bg-green-600 text-white px-4 py-3 rounded-lg w-full sm:w-auto"
                        >
                            + Add Question
                        </button>

                    </div>


                    {/* ADD FORM */}

                    {showCodingForm && (

                        <form
                            onSubmit={addCoding}
                            className="bg-white p-6 rounded-xl shadow mb-6"
                        >

                            <h2 className="text-xl font-bold mb-4">
                                Add Coding Question
                            </h2>


                            <input
                                placeholder="Title"
                                value={coding.title}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        title: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <textarea
                                placeholder="Description"
                                value={coding.description}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        description: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <select
                                value={coding.difficulty}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        difficulty: e.target.value
                                    })
                                }
                                className="input"
                            >

                                <option value="Easy">
                                    Easy
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="Hard">
                                    Hard
                                </option>

                            </select>


                            <input
                                placeholder="Input Example"
                                value={coding.input}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        input: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <input
                                placeholder="Output Example"
                                value={coding.output}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        output: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <textarea
                                placeholder="Starter Java Code"
                                value={coding.starterCode}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        starterCode: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <input
                                placeholder="Hidden Test Input"
                                value={coding.hiddenInput}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        hiddenInput: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <input
                                placeholder="Hidden Test Expected Output"
                                value={coding.hiddenOutput}
                                onChange={(e) =>
                                    setCoding({
                                        ...coding,
                                        hiddenOutput: e.target.value
                                    })
                                }
                                className="input"
                            />


                            <button
                                className="bg-green-600 text-white px-5 py-3 rounded-lg"
                            >
                                Save Coding Question
                            </button>

                        </form>
                    )}


                    {/* QUESTIONS */}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {codingQuestions.map(
                            (question, index) => (

                                <div
                                    key={question._id}
                                    className="bg-white p-5 rounded-xl shadow"
                                >

                                    <div className="flex justify-between">

                                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                                            Q{index + 1}
                                        </span>

                                        <button
                                            onClick={() =>
                                                deleteCoding(
                                                    question._id
                                                )
                                            }
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>

                                    </div>


                                    <h3 className="font-bold mt-4">
                                        {question.title}
                                    </h3>


                                    <p className="text-gray-600 text-sm mt-2">
                                        {question.description}
                                    </p>


                                    <p className="text-gray-500 text-sm mt-3">
                                        Difficulty:{" "}
                                        {question.difficulty}
                                    </p>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>
        );
    }


    // MAIN ADMIN PAGE
   

    return (

        <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

            <div className="max-w-7xl mx-auto">


                {/* HEADER */}

                <div className="bg-white p-6 rounded-2xl shadow mb-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

                        <div>

                            <p className="text-blue-600 font-semibold">
                                PREPWISE ADMIN
                            </p>

                            <h1 className="text-3xl font-bold">
                                Admin Dashboard 👑
                            </h1>

                            <p className="text-gray-500">
                                Manage your platform
                            </p>

                        </div>


                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

                            <button
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full sm:w-auto"
                            >
                                Student Dashboard
                            </button>

                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-3 rounded-lg w-full sm:w-auto"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>


                {/* STATS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">

                    <StatCard
                        title="Users"
                        value={data?.totalUsers || 0}
                        icon="👥"
                    />

                    <StatCard
                        title="Aptitude Attempts"
                        value={data?.aptitudeTests || 0}
                        icon="🧠"
                    />

                    <StatCard
                        title="Coding Attempts"
                        value={data?.codingTests || 0}
                        icon="💻"
                    />

                    <StatCard
                        title="Admins"
                        value={data?.totalAdmins || 0}
                        icon="👑"
                    />

                </div>


                {/* USERS */}

                <div className="bg-white p-6 rounded-2xl shadow mb-8">

                    <h2 className="text-2xl font-bold mb-5">
                        👥 Users
                    </h2>


                    <div className="overflow-x-auto">

                        <table className="min-w-[700px] w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-3">
                                        Name
                                    </th>

                                    <th className="text-left py-3">
                                        Email
                                    </th>

                                    <th className="text-left py-3">
                                        Role
                                    </th>

                                    <th className="text-left py-3">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-b"
                                    >

                                        <td className="py-4">
                                            {user.name}
                                        </td>

                                        <td className="py-4">
                                            {user.email}
                                        </td>

                                        <td className="py-4">
                                            {user.role === "admin"
                                                ? "👑 Admin"
                                                : "👤 User"}
                                        </td>

                                        <td className="py-4">

                                            {user.role !== "admin" && (

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            makeAdmin(
                                                                user._id
                                                            )
                                                        }
                                                        className="bg-purple-600 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        Make Admin
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteUser(
                                                                user._id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* QUESTION SECTIONS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    {/* APTITUDE CARD */}

                    <div className="bg-white p-5 sm:p-8 rounded-2xl shadow">

                        <div className="text-4xl mb-4">
                            🧠
                        </div>

                        <h2 className="text-2xl font-bold">
                            Aptitude
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Manage aptitude questions
                        </p>

                        <p className="font-semibold mt-4">
                            {aptitudeQuestions.length} Questions
                        </p>


                        <button
                            onClick={() => setPage("aptitude")}
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-5 w-full sm:w-auto"
                        >
                            Open Aptitude →
                        </button>

                    </div>


                    {/* CODING CARD */}

                    <div className="bg-white p-5 sm:p-8 rounded-2xl shadow">

                        <div className="text-4xl mb-4">
                            💻
                        </div>

                        <h2 className="text-2xl font-bold">
                            Coding
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Manage Java coding questions
                        </p>

                        <p className="font-semibold mt-4">
                            {codingQuestions.length} Questions
                        </p>


                        <button
                            onClick={() => setPage("coding")}
                            className="bg-green-600 text-white px-5 py-3 rounded-lg mt-5 w-full sm:w-auto"
                        >
                            Open Coding →
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}


// =========================
// STAT CARD
// =========================

function StatCard({ title, value, icon }) {

    return (

        <div className="bg-white p-6 rounded-2xl shadow">

            <div className="text-3xl">
                {icon}
            </div>

            <p className="text-gray-500 mt-2">
                {title}
            </p>

            <h2 className="text-3xl font-bold">
                {value}
            </h2>

        </div>
    );
}


export default Admin;