require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

const makeAdmin = async () => {

    try {

        await connectDB();

        const email = "aditya@gmail.com";
        const password = "Admin@123";
        const name = "Aditya Admin";

        let user = await User.findOne({ email });

        
        if (!user) {

            const hashedPassword =
                await bcrypt.hash(password, 10);

            user = await User.create({
                name: name,
                email: email,
                password: hashedPassword,
                role: "admin"
            });

            console.log("Admin account created successfully");

        } else {

           
            user.role = "admin";

           
            user.password =
                await bcrypt.hash(password, 10);

            await user.save();

            console.log("Existing user is now Admin");
        }

        console.log("--------------------------------");
        console.log("Admin Email:", email);
        console.log("Admin Password:", password);
        console.log("Admin Role:", user.role);
        console.log("--------------------------------");

        process.exit(0);

    } catch (error) {

        console.error("Error:", error.message);

        process.exit(1);
    }
};

makeAdmin();