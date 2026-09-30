const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        fileName: {
            type: String,
            required: true,
            trim: true
        },

        filePath: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Resume = mongoose.model(
    "Resume",
    resumeSchema
);

module.exports = Resume;