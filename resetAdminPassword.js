const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();

const resetAdminPassword = async () => {
    try {
        await connectDB();

        const email = "aditya@gmail.com";

        
        const newPassword = "Admin@123";

        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found:", email);
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        // Admin role bhi confirm kar do
        user.role = "admin";

        await user.save();

        console.log("");
        console.log("=================================");
        console.log("✅ ADMIN ACCOUNT UPDATED");
        console.log("=================================");
        console.log("Email:", email);
        console.log("Password:", newPassword);
        console.log("Role:", user.role);
        console.log("=================================");
        console.log("");

        process.exit(0);

    } catch (error) {
        console.error(
            "❌ ERROR:",
            error
        );

        process.exit(1);
    }
};

resetAdminPassword();