require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");



// GEMINI API


const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error(
        "GEMINI_API_KEY is missing from .env file"
    );
}


const ai = new GoogleGenAI({
    apiKey: apiKey
});



// GENERATE AI RESPONSE WITH RETRY


const generateWithRetry = async (prompt) => {

    const models = [
        "gemini-3.8-flash",
        "gemini-3.5-flash"
    ];


    let lastError = null;


    for (const model of models) {

        for (
            let attempt = 1;
            attempt <= 2;
            attempt++
        ) {

            try {

                console.log(
                    `Trying Gemini model: ${model} | Attempt: ${attempt}`
                );


                const response =
                    await ai.models.generateContent({
                        model: model,
                        contents: prompt
                    });


                console.log(
                    `Gemini success: ${model}`
                );


                return response.text;


            } catch (error) {

                lastError = error;


                console.log(
                    `Gemini error on ${model}, attempt ${attempt}:`,
                    error.message
                );


                if (attempt < 2) {

                    await new Promise(
                        (resolve) =>
                            setTimeout(
                                resolve,
                                2000
                            )
                    );
                }
            }
        }
    }


    throw lastError;
};



// RESUME ANALYSIS


const analyzeResume = async (
    resumeText
) => {

    if (
        !resumeText ||
        !resumeText.trim()
    ) {

        throw new Error(
            "Resume text is empty"
        );
    }


    const prompt = `
You are an expert technical recruiter and resume reviewer.

Analyze the following resume for a fresher applying for software development and MERN stack jobs.

Give feedback in the following format:

1. Resume Score
Give a score out of 100.

2. Strengths
Mention the strongest parts of the resume.

3. Weaknesses
Mention the important problems or missing information.

4. Skills Analysis
Tell which technical skills are strong and which skills should be improved.

5. Project Analysis
Review the projects and suggest improvements.

6. ATS Suggestions
Give practical suggestions to improve ATS compatibility.

7. Missing Skills
Suggest important skills that the candidate should learn.

8. Final Suggestions
Give 5 specific actions the candidate should take to improve the resume.

Keep the feedback practical and suitable for a fresher.

Do not invent information that is not present in the resume.

Resume:

${resumeText}
`;


    return await generateWithRetry(
        prompt
    );
};



// EXPORT


module.exports = analyzeResume;