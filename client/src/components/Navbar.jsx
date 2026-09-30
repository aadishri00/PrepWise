import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [user, setUser] = useState(null);

    // Get logged-in user
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get("/profile");

                setUser(
                    response.data.user ||
                    response.data
                );
            } catch (error) {
                console.log("Navbar user error:", error);
            }
        };

        getUser();
    }, []);

    const logout = async () => {
        try {
            setLoggingOut(true);

            await api.post("/auth/logout");

            navigate("/login");

        } catch (error) {
            console.log("Logout error:", error);

            navigate("/login");

        } finally {
            setLoggingOut(false);
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const linkClass = (path) => {
        return `
            px-3 py-2 rounded-lg text-sm font-medium transition
            ${isActive(path)
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }
        `;
    };

    return (
        <nav className="bg-gray-950 text-white shadow-lg sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-5">

                <div className="h-16 flex items-center justify-between">

                    {/* LOGO */}

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2"
                        onClick={() => setMenuOpen(false)}
                    >

                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
                            P
                        </div>

                        <div>

                            <h1 className="text-xl font-bold">
                                PrepWise
                            </h1>

                            <p className="text-[10px] text-gray-400 -mt-1">
                                Placement Preparation
                            </p>

                        </div>

                    </Link>


                    {/* DESKTOP MENU */}

                    <div className="hidden lg:flex items-center gap-1">

                        <Link
                            to="/dashboard"
                            className={linkClass("/dashboard")}
                        >
                            Dashboard
                        </Link>


                        <Link
                            to="/resume"
                            className={linkClass("/resume")}
                        >
                            Resume
                        </Link>


                        <Link
                            to="/aptitude"
                            className={linkClass("/aptitude")}
                        >
                            Aptitude
                        </Link>


                        <Link
                            to="/coding"
                            className={linkClass("/coding")}
                        >
                            Coding
                        </Link>


                        <Link
                            to="/interview"
                            className={linkClass("/interview")}
                        >
                            Interview
                        </Link>


                        <Link
                            to="/progress"
                            className={linkClass("/progress")}
                        >
                            Progress
                        </Link>


                        <Link
                            to="/profile"
                            className={linkClass("/profile")}
                        >
                            Profile
                        </Link>


                        {/* ADMIN PANEL */}

                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                className={`
                                    px-3 py-2 rounded-lg text-sm font-medium
                                    transition
                                    ${isActive("/admin")
                                        ? "bg-purple-600 text-white"
                                        : "text-purple-300 hover:bg-purple-900 hover:text-white"
                                    }
                                `}
                            >
                                Admin Panel
                            </Link>
                        )}


                        {/* LOGOUT */}

                        <button
                            onClick={logout}
                            disabled={loggingOut}
                            className="ml-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            {loggingOut
                                ? "Logging out..."
                                : "Logout"
                            }
                        </button>

                    </div>


                    {/* MOBILE BUTTON */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-800"
                    >

                        {menuOpen ? (

                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                        ) : (

                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>

                        )}

                    </button>

                </div>


                {/* MOBILE MENU */}

                {menuOpen && (

                    <div className="lg:hidden border-t border-gray-800 py-4 space-y-1">

                        <MobileLink
                            to="/dashboard"
                            label="Dashboard"
                            active={isActive("/dashboard")}
                            closeMenu={() => setMenuOpen(false)}
                        />

                        <MobileLink
                            to="/resume"
                            label="Resume"
                            active={isActive("/resume")}
                            closeMenu={() => setMenuOpen(false)}
                        />

                        <MobileLink
                            to="/aptitude"
                            label="Aptitude"
                            active={isActive("/aptitude")}
                            closeMenu={() => setMenuOpen(false)}
                        />

                        <MobileLink
                            to="/coding"
                            label="Coding"
                            active={isActive("/coding")}
                            closeMenu={() => setMenuOpen(false)}
                        />

                        <MobileLink
                            to="/interview"
                            label="Interview"
                            active={isActive("/interview")}
                            closeMenu={() => setMenuOpen(false)}
                        />

                        <MobileLink
                            to="/progress"
                            label="Progress"
                            active={isActive("/progress")}
                            closeMenu={() => setMenuOpen(false)}
                        />

                        <MobileLink
                            to="/profile"
                            label="Profile"
                            active={isActive("/profile")}
                            closeMenu={() => setMenuOpen(false)}
                        />


                        {/* MOBILE ADMIN */}

                        {user?.role === "admin" && (
                            <MobileLink
                                to="/admin"
                                label="🛡️ Admin Panel"
                                active={isActive("/admin")}
                                closeMenu={() => setMenuOpen(false)}
                            />
                        )}


                        {/* MOBILE LOGOUT */}

                        <button
                            onClick={logout}
                            disabled={loggingOut}
                            className="w-full text-left mt-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 px-4 py-3 rounded-lg font-medium"
                        >
                            {loggingOut
                                ? "Logging out..."
                                : "Logout"
                            }
                        </button>

                    </div>

                )}

            </div>

        </nav>
    );
}


function MobileLink({
    to,
    label,
    active,
    closeMenu
}) {
    return (
        <Link
            to={to}
            onClick={closeMenu}
            className={`
                block px-4 py-3 rounded-lg font-medium
                ${active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
            `}
        >
            {label}
        </Link>
    );
}


export default Navbar;