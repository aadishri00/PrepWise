const mongoose = require("mongoose");

const codingQuestionSchema =
    new mongoose.Schema(
        {

            title: {
                type: String,

                required: true,

                trim: true
            },


            description: {
                type: String,

                required: true
            },


            difficulty: {
                type: String,

                enum: [
                    "Easy",
                    "Medium",
                    "Hard"
                ],

                required: true
            },


            category: {
                type: String,

                required: true
            },


            input: {
                type: String,

                default: ""
            },


            output: {
                type: String,

                default: ""
            },


            starterCode: {
                type: String,

                default: ""
            },


            // HIDDEN TEST CASES

            hiddenTestCases: [
                {

                    input: {
                        type: String,

                        required: true
                    },


                    expectedOutput: {
                        type: String,

                        required: true
                    }

                }
            ]

        },

        {
            timestamps: true
        }
    );


module.exports =
    mongoose.model(
        "CodingQuestion",
        codingQuestionSchema
    );