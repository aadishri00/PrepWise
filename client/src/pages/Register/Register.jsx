import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const register = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 p-5">

            <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">

                <h1 className="text-3xl font-bold text-blue-600 text-center">
                    PrepWise
                </h1>

                <h2 className="text-2xl font-bold text-center mt-6">
                    Create Account
                </h2>

                <form onSubmit={register} className="space-y-4 mt-6">

                    <input
                        placeholder="Full Name"
                        className="w-full border p-3 rounded-lg"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
                        Register
                    </button>

                </form>

                <p className="text-center mt-5">
                    Already have account?
                    <Link to="/login" className="text-blue-600 ml-1">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;