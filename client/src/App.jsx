import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/profile/Profile";

import Resume from "./pages/Resume/Resume";
import ResumeFeedback from "./pages/Resume/ResumeFeedback";

import Aptitude from "./pages/Aptitude/Aptitude";
import AptitudePractice from "./pages/Aptitude/AptitudePractice";
import AptitudeHistory from "./pages/AptitudeHistory/AptitudeHistory";

import Coding from "./pages/Coding/Coding";
import CodingHistory from "./pages/CodingHistory/CodingHistory";

import Progress from "./pages/Progress/Progress";

import Interview from "./pages/Interview/Interview";
import TechnicalInterview from "./pages/Interview/TechnicalInterview";
import HRInterview from "./pages/Interview/HRInterview";
import MockInterview from "./pages/Interview/MockInterview";

import Admin from "./pages/Admin/Admin";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* REGISTER */}
                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* PROFILE */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* RESUME */}
                <Route
                    path="/resume"
                    element={
                        <ProtectedRoute>
                            <Resume />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume-feedback"
                    element={
                        <ProtectedRoute>
                            <ResumeFeedback />
                        </ProtectedRoute>
                    }
                />


                {/* APTITUDE */}
                <Route
                    path="/aptitude"
                    element={
                        <ProtectedRoute>
                            <Aptitude />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/aptitude-practice"
                    element={
                        <ProtectedRoute>
                            <AptitudePractice />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/aptitude-history"
                    element={
                        <ProtectedRoute>
                            <AptitudeHistory />
                        </ProtectedRoute>
                    }
                />


                {/* CODING */}
                <Route
                    path="/coding"
                    element={
                        <ProtectedRoute>
                            <Coding />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/coding-history"
                    element={
                        <ProtectedRoute>
                            <CodingHistory />
                        </ProtectedRoute>
                    }
                />


                {/* PROGRESS */}
                <Route
                    path="/progress"
                    element={
                        <ProtectedRoute>
                            <Progress />
                        </ProtectedRoute>
                    }
                />


                {/* INTERVIEW */}
                <Route
                    path="/interview"
                    element={
                        <ProtectedRoute>
                            <Interview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/technical-interview"
                    element={
                        <ProtectedRoute>
                            <TechnicalInterview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/hr-interview"
                    element={
                        <ProtectedRoute>
                            <HRInterview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mock-interview"
                    element={
                        <ProtectedRoute>
                            <MockInterview />
                        </ProtectedRoute>
                    }
                />


                {/* ADMIN */}
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />


                {/* DEFAULT */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />



            </Routes>

        </BrowserRouter>
    );
}

export default App;