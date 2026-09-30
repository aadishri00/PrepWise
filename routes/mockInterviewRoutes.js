const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MODEL = "gemini-3.5-flash-lite";


// AI FUNCTION

async function askAI(prompt) {

    const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            maxOutputTokens: 180
        }
    });

    let text = response.text || "";

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);
}


// START INTERVIEW

router.post("/start", authMiddleware, async (req, res) => {

    try {

        const type =
            req.body.type || "Technical Interview";

        const prompt = `
You are a real company interviewer.

Interview type: ${type}

Candidate is a fresher software developer.

Generate the first interview question yourself.

Do not use a fixed question list.

Ask only ONE question.

Return JSON only:

{
    "question": "your question"
}
`;

        const result = await askAI(prompt);

        if (!result.question) {
            throw new Error("Question not generated");
        }

        res.json({
            question: result.question
        });

    } catch (error) {

        console.error(
            "Start interview error:",
            error.status || error.message
        );

        if (error.status === 429) {
            return res.status(429).json({
                message:
                    "Gemini API limit reached. Please wait and try again."
            });
        }

        res.status(503).json({
            message:
                "AI interviewer is temporarily unavailable."
        });
    }
});


// ANSWER

router.post("/answer", authMiddleware, async (req, res) => {

    try {

        const {
            type,
            question,
            answer,
            questionNumber,
            previousQuestions = []
        } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        const studentAnswer =
            String(answer || "").trim();

        // Empty answer
        if (!studentAnswer) {

            return res.json({
                technicalKnowledge: 0,
                communication: 0,
                relevance: 0,
                feedback: "No answer was provided.",
                improvement: "Please answer the question.",
                nextQuestion:
                    Number(questionNumber) >= 5
                        ? ""
                        : null
            });
        }


        const prompt = `
You are conducting a real company interview.

Interview type:
${type}

Current question:
${question}

Candidate answer:
${studentAnswer}

Question number:
${questionNumber} of 5

Previous questions:
${JSON.stringify(previousQuestions)}

Evaluate ONLY the current answer.

TECHNICAL KNOWLEDGE:
Give 0 to 10.

- Correct answer = high score
- Partially correct = partial score
- Wrong answer = low score
- Unrelated answer = 0

RELEVANCE:
Give 0 to 10.

Check whether the answer actually answers
the current question.

COMMUNICATION:
The candidate answered using text.

Set communication = 0.

Do not give communication marks for:
- answer length
- grammar
- number of words

RANDOM ANSWERS:

If answer is meaningless such as:

aditya
hello
abc
xyz
test
nothing

then all scores must be 0.

FEEDBACK:
Give feedback about the current answer only.

IMPROVEMENT:
Give one simple useful improvement.

NEXT QUESTION:

You are responsible for deciding the next interview question.

IMPORTANT:
There is NO fixed 5-question interview.

The application only uses 5 questions per practice session
for demonstration and scoring.

Every time a candidate starts a NEW interview session,
generate a fresh and different set of questions.

For the NEXT question:

- Generate the question yourself.
- Do NOT use a fixed question list.
- Do NOT repeat any previous question.
- Check the previous questions provided above.
- Ask a different question every time.
- The question can come from any relevant topic.
- Match the selected interview type.
- Keep it suitable for a fresher software developer.
- You may ask conceptual, practical, scenario-based,
  debugging, project-based, or follow-up questions.
- The next question may depend on the candidate's previous answer.
- Do not always follow the same sequence of topics.
- Do not always ask the same popular questions.

The 5-question limit is ONLY the length of ONE practice session.
It does NOT mean the interview has only 5 possible questions.

If question number is 5:

nextQuestion = ""

Return ONLY JSON:

{
    "technicalKnowledge": 0,
    "communication": 0,
    "relevance": 0,
    "feedback": "feedback",
    "improvement": "improvement",
    "nextQuestion": "new interview question"
}

Return ONLY JSON:

{
    "technicalKnowledge": 0,
    "communication": 0,
    "relevance": 0,
    "feedback": "feedback",
    "improvement": "improvement",
    "nextQuestion": "next question"
}
`;

        const result = await askAI(prompt);


        let technical =
            Number(result.technicalKnowledge);

        let relevance =
            Number(result.relevance);


        // Safe score
        technical = Number.isFinite(technical)
            ? Math.max(0, Math.min(10, technical))
            : 0;

        relevance = Number.isFinite(relevance)
            ? Math.max(0, Math.min(10, relevance))
            : 0;


        // Text answer
        const communication = 0;


        // Random answer check
        const randomAnswers = [
            "aditya",
            "hello",
            "abc",
            "xyz",
            "test",
            "nothing"
        ];

        if (
            randomAnswers.includes(
                studentAnswer.toLowerCase()
            )
        ) {
            technical = 0;
            relevance = 0;
        }


        let nextQuestion =
            result.nextQuestion || "";


        if (Number(questionNumber) >= 5) {
            nextQuestion = "";
        }


        res.json({

            technicalKnowledge: technical,

            communication: communication,

            relevance: relevance,

            feedback:
                result.feedback ||
                "Answer evaluated.",

            improvement:
                result.improvement ||
                "Try to improve your answer.",

            nextQuestion: nextQuestion
        });


    } catch (error) {

        console.error(
            "Answer evaluation error:",
            error.status || error.message
        );


        if (error.status === 429) {

            return res.status(429).json({
                message:
                    "Gemini API limit reached. Please wait and try again."
            });
        }


        res.status(503).json({
            message:
                "AI evaluation is temporarily unavailable."
        });
    }
});


module.exports = router;