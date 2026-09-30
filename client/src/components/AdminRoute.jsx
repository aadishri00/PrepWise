import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function AdminRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        const checkAdmin = async () => {

            // Current tab login check
            const session =
                sessionStorage.getItem("loggedIn");

            if (session !== "true") {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {

                const response =
                    await api.get("/profile");

                const user =
                    response.data.user;

                if (user.role === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }

            } catch (error) {

                sessionStorage.removeItem("loggedIn");
                setIsAdmin(false);

            } finally {

                setLoading(false);
            }
        };

        checkAdmin();

    }, []);

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Checking admin access...
                </p>
            </div>
        );
    }

    if (!isAdmin) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
}

export default AdminRoute;