import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState("user");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }


        try {

            setLoading(true);
            const response = await api.post("/auth/login", {
                email,
                password
            });
            const user = response.data.user;
            if (loginType === "admin") {

                if (user.role !== "admin") {

                    setError(
                        "This account is not an admin account"
                    );

                    return;
                }

                sessionStorage.setItem(
                    "loggedIn",
                    "true"
                );

                navigate("/admin");

                return;
            }


            if (loginType === "user") {

                if (user.role === "admin") {

                    setError(
                        "Please use Admin Login for this account"
                    );

                    return;
                }

                sessionStorage.setItem(
                    "loggedIn",
                    "true"
                );

                navigate("/dashboard");
            }


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">


                {/* TITLE */}

                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Login to PrepWise
                </p>


                {/* LOGIN TYPE */}

                <div className="grid grid-cols-2 gap-3 mb-6">

                    <button
                        type="button"
                        onClick={() => {
                            setLoginType("user");
                            setError("");
                        }}
                        className={`py-3 rounded-lg font-semibold ${loginType === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        👤 User Login
                    </button>


                    <button
                        type="button"
                        onClick={() => {
                            setLoginType("admin");
                            setError("");
                        }}
                        className={`py-3 rounded-lg font-semibold ${loginType === "admin"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        👑 Admin Login
                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>

                )}


                {/* LOGIN FORM */}

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >


                    {/* EMAIL */}

                    <div>

                        <label className="block mb-1 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div>

                        <label className="block mb-1 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-3 rounded-lg font-semibold disabled:opacity-50 ${loginType === "admin"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >

                        {loading
                            ? "Logging in..."
                            : loginType === "admin"
                                ? "Login as Admin"
                                : "Login as User"
                        }

                    </button>

                </form>


                {/* REGISTER */}

                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?{" "}

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        className="text-blue-600 font-semibold cursor-pointer"
                    >
                        Register
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Login;