const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testResultRoutes = require("./routes/testResultRoutes");
const codingQuestionRoutes =
    require("./routes/codingQuestionRoutes");
const codeRoutes =
    require("./routes/codeRoutes");
const codingResultRoutes =
    require("./routes/codingResultRoutes");
const aiRoutes =
    require("./routes/aiRoutes");

const interviewRoutes =
    require("./routes/interviewRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const mockInterviewRoutes = require("./routes/mockInterviewRoutes");


// APP

const app = express();

const PORT = process.env.PORT || 5000;


// GEMINI CHECK

if (process.env.GEMINI_API_KEY) {
    console.log("Gemini API key loaded");
} else {
    console.log("GEMINI_API_KEY is missing");
}


// DATABASE

connectDB();


// MIDDLEWARE

app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin:
            process.env.CLIENT_URL ||
            "http://localhost:5173",
        credentials: true
    })
);


// STATIC UPLOADS

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// INTERVIEW

app.use(
    "/api/interview",
    interviewRoutes
);


app.use("/api/mock-interview", mockInterviewRoutes);


// TEST

app.get("/api/test", (req, res) => {

    res.json({
        message: "PrepWise Backend is Working!"
    });

});


// HEALTH

app.get("/api/health", (req, res) => {

    res.json({
        status: "OK",
        message: "PrepWise backend is running"
    });

});


// REGISTER

app.post(
    "/api/auth/register",
    async (req, res, next) => {

        try {

            let { name, email, password } = req.body;

            // Basic validation
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "Name, email and password are required"
                });
            }

            // Clean input
            name = name.trim();
            email = email.trim().toLowerCase();

            // Name validation
            if (name.length < 2) {
                return res.status(400).json({
                    message: "Name must contain at least 2 characters"
                });
            }

            // Email validation
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Please enter a valid email address"
                });
            }

            // Password validation
            if (password.length < 8) {
                return res.status(400).json({
                    message: "Password must be at least 8 characters"
                });
            }

            // Check existing user
            const existingUser =
                await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            // Hash password
            const hashedPassword =
                await bcrypt.hash(password, 10);

            // Create user
            const user =
                await User.create({
                    name,
                    email,
                    password: hashedPassword
                });

            res.status(201).json({

                message:
                    "User registered successfully",

                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

            });

        } catch (error) {

            next(error);

        }

    }
);


// LOGIN

app.post(
    "/api/auth/login",
    async (req, res, next) => {

        try {

            let { email, password } = req.body;

            // Basic validation
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required"
                });
            }

            // Clean email
            email = email.trim().toLowerCase();

            // Email validation
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Please enter a valid email address"
                });
            }

            // Find user
            const user =
                await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: "Invalid email or password"
                });
            }

            // Compare password
            const isPasswordCorrect =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: "Invalid email or password"
                });
            }

            // Create JWT
            const token =
                jwt.sign(
                    {
                        userId: user._id,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                );

            // Store token in HTTP-only cookie
            res.cookie(
                "token",
                token,
                {
                    httpOnly: true,

                    secure:
                        process.env.NODE_ENV ===
                        "production",

                    sameSite:
                        process.env.NODE_ENV ===
                            "production"
                            ? "none"
                            : "lax",

                    maxAge:
                        7 *
                        24 *
                        60 *
                        60 *
                        1000
                }
            );

            res.json({

                message:
                    "Login successful",

                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

            });

        } catch (error) {

            next(error);

        }

    }
);

// GET PROFILE

app.get(
    "/api/profile",
    authMiddleware,
    async (req, res, next) => {

        try {

            const user =
                await User.findById(
                    req.user.userId
                );

            if (!user) {

                return res.status(404).json({
                    message:
                        "User not found"
                });

            }

            res.json({

                message:
                    "Profile fetched successfully",

                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone || "",
                    college: user.college || "",
                    skills: user.skills || "",
                    role: user.role || "user"
                }

            });

        } catch (error) {

            next(error);

        }

    }
);


// UPDATE PROFILE

app.put(
    "/api/profile",
    authMiddleware,
    async (req, res, next) => {

        try {

            let {
                name,
                email,
                phone,
                college,
                skills
            } = req.body;

            // Required fields
            if (!name || !email) {
                return res.status(400).json({
                    message: "Name and email are required"
                });
            }

            // Clean input
            name = name.trim();
            email = email.trim().toLowerCase();

            phone = phone ? phone.trim() : "";
            college = college ? college.trim() : "";

            // Name validation
            if (name.length < 2) {
                return res.status(400).json({
                    message: "Name must contain at least 2 characters"
                });
            }

            // Email validation
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Please enter a valid email address"
                });
            }

            // Phone validation
            if (phone && !/^[0-9]{10}$/.test(phone)) {
                return res.status(400).json({
                    message: "Phone number must contain exactly 10 digits"
                });
            }

            // College length
            if (college.length > 100) {
                return res.status(400).json({
                    message: "College name is too long"
                });
            }

            // Skills validation
            if (skills && !Array.isArray(skills) && typeof skills !== "string") {
                return res.status(400).json({
                    message: "Skills must be a list or text"
                });
            }

            // Check duplicate email
            const existingUser =
                await User.findOne({
                    email,
                    _id: {
                        $ne: req.user.userId
                    }
                });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            // Update user
            const user =
                await User.findByIdAndUpdate(
                    req.user.userId,

                    {
                        name,
                        email,
                        phone,
                        college,
                        skills
                    },

                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.json({

                message:
                    "Profile updated successfully",

                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone || "",
                    college: user.college || "",
                    skills: user.skills || "",
                    role: user.role || "user"
                }

            });

        } catch (error) {

            next(error);

        }

    }
);


// LOGOUT

app.post(
    "/api/auth/logout",
    (req, res, next) => {

        try {

            res.clearCookie(
                "token",
                {
                    httpOnly: true,

                    secure:
                        process.env.NODE_ENV ===
                        "production",

                    sameSite:
                        process.env.NODE_ENV ===
                            "production"
                            ? "none"
                            : "lax"
                }
            );

            res.json({
                message:
                    "Logout successful"
            });

        } catch (error) {

            next(error);

        }

    }
);


// RESUME

app.use(
    "/api/resume",
    resumeRoutes
);


// APTITUDE

app.use(
    "/api/questions",
    questionRoutes
);

app.use(
    "/api/test-results",
    testResultRoutes
);


// CODING

app.use(
    "/api/coding-questions",
    codingQuestionRoutes
);

app.use(
    "/api/code",
    codeRoutes
);

app.use(
    "/api/coding-results",
    codingResultRoutes
);


// AI

app.use(
    "/api/ai",
    aiRoutes
);


// ADMIN

app.use(
    "/api/admin",
    adminRoutes
);


// ERROR HANDLER

app.use(errorMiddleware);


// START SERVER

app.listen(
    PORT,
    () => {

        console.log(
            `Server is running on port ${PORT}`
        );

    }
);