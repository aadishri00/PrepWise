import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        const checkLogin = async () => {

            // Tab session check
            const session = sessionStorage.getItem("loggedIn");

            if (session !== "true") {
                setLoggedIn(false);
                setLoading(false);
                return;
            }

            try {

                // Backend login check
                await api.get("/profile");

                setLoggedIn(true);

            } catch (error) {

                // Backend session invalid
                sessionStorage.removeItem("loggedIn");
                setLoggedIn(false);

            } finally {

                setLoading(false);

            }
        };

        checkLogin();

    }, []);

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Checking login...</p>
            </div>
        );

    }

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;