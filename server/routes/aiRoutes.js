const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const cacheFolder = path.join(__dirname, "..", "ai-cache");

if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder, { recursive: true });
}


// =====================================================
// HELPERS
// =====================================================

function safeNumber(value, min, max) {
    const number = Number(value);

    if (Number.isNaN(number)) {
        return 0;
    }

    return Math.max(min, Math.min(max, number));
}

function safeArray(value) {
    return Array.isArray(value) ? value : [];
}

function lower(value) {
    return typeof value === "string"
        ? value.toLowerCase()
        : "";
}

function hasAny(value, words) {
    const str = lower(value);

    return words.some(word =>
        str.includes(word.toLowerCase())
    );
}


// =====================================================
// TECHNICAL VALUE
// IMPORTANT:
// weaknesses/improvements are NOT used.
// Only actual technologies + strengths are considered.
// =====================================================

function calculateTechnicalValue(project) {

    let score = 0;

    const evidenceText = [
        project.name,
        project.type,
        project.level,
        ...(project.technologies || []),
        ...(project.strengths || [])
    ].join(" ");

    // API / Backend
    if (
        hasAny(evidenceText, [
            "rest api",
            "api integration",
            "backend",
            "express",
            "node.js",
            "node"
        ])
    ) {
        score += 1;
    }

    // Database
    if (
        hasAny(evidenceText, [
            "mongodb",
            "mysql",
            "postgresql",
            "database",
            "mongoose",
            "sql"
        ])
    ) {
        score += 1;
    }

    // Authentication / Authorization
    if (
        hasAny(evidenceText, [
            "jwt",
            "authentication",
            "authorization",
            "passport",
            "role-based access",
            "rbac"
        ])
    ) {
        score += 1;
    }

    // File / Cloud
    if (
        hasAny(evidenceText, [
            "multer",
            "file upload",
            "cloudinary",
            "cloud storage",
            "image upload"
        ])
    ) {
        score += 1;
    }

    // Advanced engineering
    if (
        hasAny(evidenceText, [
            "redis",
            "caching implemented",
            "websocket",
            "real-time architecture",
            "microservices",
            "queue",
            "event driven",
            "rate limiting",
            "performance optimization"
        ])
    ) {
        score += 2;
    }

    // AI / ML
    if (
        hasAny(evidenceText, [
            "artificial intelligence",
            "machine learning",
            "ai integration",
            "gemini api",
            "openai api",
            "recommendation system",
            "recommendation engine"
        ])
    ) {
        score += 2;
    }

    // Testing
    if (
        hasAny(evidenceText, [
            "unit testing",
            "integration testing",
            "jest",
            "testing implemented"
        ])
    ) {
        score += 1;
    }

    // Deployment / DevOps
    if (
        hasAny(evidenceText, [
            "docker",
            "kubernetes",
            "aws",
            "ci/cd",
            "deployed application"
        ])
    ) {
        score += 1;
    }

    // Security
    if (
        hasAny(evidenceText, [
            "input validation",
            "encryption",
            "security implementation",
            "rate limiting"
        ])
    ) {
        score += 1;
    }

    // Clone technical value cap
    if (lower(project.type) === "clone") {
        score = Math.min(score, 4);
    }

    return Math.min(score, 5);
}


// =====================================================
// NORMALIZE PROJECT
// =====================================================

function normalizeProject(project) {

    let type =
        project.type ||
        "Other";

    let level =
        project.level ||
        "Basic";

    let technicalDepth =
        safeNumber(
            project.technicalDepth,
            0,
            10
        );

    let problemSolving =
        safeNumber(
            project.problemSolving,
            0,
            5
        );

    let uniqueness =
        safeNumber(
            project.uniqueness,
            0,
            5
        );

    let resumeQuality =
        safeNumber(
            project.resumeQuality,
            0,
            5
        );

    const technologies =
        safeArray(project.technologies);

    const strengths =
        safeArray(project.strengths);

    const weaknesses =
        safeArray(project.weaknesses);

    const improvements =
        safeArray(project.improvements);


    // Only actual project information for classification.
    const projectEvidence = [
        project.name,
        project.type,
        project.level,
        ...technologies,
        ...strengths
    ].join(" ");
    // CLO

    const isClone =
        hasAny(projectEvidence, [
            "clone",
            "replica",
            "recreated",
            "recreation",
            "copy of"
        ]);

    if (isClone) {

        type = "Clone";

        level = "Moderate";

        uniqueness =
            Math.min(
                uniqueness,
                2
            );

        technicalDepth =
            Math.min(
                technicalDepth,
                8
            );
    }
    // BAS

    const isBasic =
        hasAny(projectEvidence, [
            "tutorial",
            "beginner",
            "common utility",
            "basic project"
        ]);

    if (
        isBasic &&
        !isClone
    ) {

        if (type === "Other") {
            type = "Common Utility";
        }

        level = "Basic";

        technicalDepth =
            Math.min(
                technicalDepth,
                4
            );

        problemSolving =
            Math.min(
                problemSolving,
                2
            );

        uniqueness =
            Math.min(
                uniqueness,
                2
            );
    }
    // ADVANCED VALIDATI

    if (
        lower(level) === "advanced"
    ) {

        const advancedFeatures = [
            "redis",
            "caching implemented",
            "websocket",
            "real-time architecture",
            "microservices",
            "microservice",
            "ai integration",
            "machine learning",
            "recommendation system",
            "payment system",
            "performance optimization",
            "rate limiting",
            "event driven",
            "queue",
            "docker",
            "kubernetes"
        ];

        let featureCount = 0;

        advancedFeatures.forEach(feature => {

            if (
                hasAny(
                    projectEvidence,
                    [feature]
                )
            ) {
                featureCount++;
            }

        });

        if (
            featureCount < 2 ||
            technicalDepth < 7 ||
            problemSolving < 4
        ) {
            level = "Moderate";
        }
    }
    // TECHNICAL VAL

    const technicalValue =
        calculateTechnicalValue({
            ...project,
            type,
            level,
            technologies,
            strengths
        });


    return {

        name:
            project.name ||
            "Unnamed Project",

        type,

        level,

        technicalDepth,

        problemSolving,

        uniqueness,

        resumeQuality,

        technicalValue,

        technologies,

        strengths,

        weaknesses,

        improvements
    };
}


// =====================================================
// PROJECT SCORE / 25
// =====================================================

function calculateProjectScore(projects) {

    if (!projects.length) {
        return 0;
    }

    const scores =
        projects.map(project => {

            const technicalDepth =
                project.technicalDepth / 10;

            const problemSolving =
                project.problemSolving / 5;

            const uniqueness =
                project.uniqueness / 5;

            const technicalValue =
                project.technicalValue / 5;

            const resumeQuality =
                project.resumeQuality / 5;


            /*
                Weight:

                Technical Depth = 30%
                Problem Solving = 25%
                Uniqueness      = 20%
                Technical Value = 15%
                Resume Quality  = 10%
            */

            return (
                technicalDepth * 0.30 +
                problemSolving * 0.25 +
                uniqueness * 0.20 +
                technicalValue * 0.15 +
                resumeQuality * 0.10
            );
        });


    const average =
        scores.reduce(
            (sum, value) =>
                sum + value,
            0
        ) / scores.length;


    let score =
        Math.round(
            average * 25
        );
    // PORTFOLIO PENALTI

    const cloneCount =
        projects.filter(
            project =>
                project.type === "Clone"
        ).length;

    const basicCount =
        projects.filter(
            project =>
                project.level === "Basic"
        ).length;


    // Two or more clones
    if (cloneCount >= 2) {
        score -= 2;
    }


    // At least one basic project
    if (basicCount >= 1) {
        score -= 1;
    }


    // All projects are clones
    if (
        cloneCount === projects.length &&
        projects.length > 0
    ) {
        score -= 2;
    }


    // All projects are basic
    if (
        basicCount === projects.length &&
        projects.length > 0
    ) {
        score -= 2;
    }


    return Math.max(
        0,
        Math.min(
            score,
            25
        )
    );
}


// =====================================================
// PROBLEM SOLVING / 10
// =====================================================

function calculateProblemSolving(
    projects,
    checks
) {

    if (!projects.length) {
        return 0;
    }

    const average =
        projects.reduce(
            (sum, project) =>
                sum + project.problemSolving,
            0
        ) / projects.length;


    let score =
        Math.round(
            average * 2
        );


    if (
        checks.hasTechnicalContribution
    ) {
        score += 1;
    }


    if (
        checks.hasActionVerbs
    ) {
        score += 1;
    }


    if (
        checks.hasQuantifiedAchievements
    ) {
        score += 1;
    }


    return Math.min(
        score,
        10
    );
}


// =====================================================
// ROUTE
// =====================================================

router.post(
    "/resume-feedback",
    async (req, res) => {

        try {

            const { fileName } =
                req.body;


            if (!fileName) {

                return res.status(400).json({
                    message:
                        "Resume file name is required"
                });
            }


            const filePath =
                path.join(
                    __dirname,
                    "..",
                    "uploads",
                    fileName
                );


            if (!fs.existsSync(filePath)) {

                return res.status(404).json({
                    message:
                        "Resume file not found"
                });
            }


            const pdfBuffer =
                fs.readFileSync(filePath);


            // PDF HASH

            const hash =
                crypto
                    .createHash("sha256")
                    .update(pdfBuffer)
                    .digest("hex");


            const cacheFile =
                path.join(
                    cacheFolder,
                    `${hash}.json`
                );


            let data;
            let cached = false;


            // CACHE

            if (
                fs.existsSync(cacheFile)
            ) {

                data =
                    JSON.parse(
                        fs.readFileSync(
                            cacheFile,
                            "utf8"
                        )
                    );

                cached = true;

            } else {



                // GEMINI PROMPT


                const prompt = `

You are a strict professional ATS resume analyzer.

Analyze the COMPLETE attached resume.

Your job is to EXTRACT FACTS and identify real resume issues.

DO NOT calculate a final ATS score.

DO NOT invent information.

DO NOT assume information that is not visible.

==================================================
PROJECT ANALYSIS
==================================================

Find EVERY project.

For every project evaluate:

- type
- level
- technicalDepth
- problemSolving
- uniqueness
- resumeQuality
- technologies
- strengths
- weaknesses
- improvements

==================================================
IMPORTANT
==================================================

Separate ACTUAL IMPLEMENTED FEATURES from
MISSING FEATURES.

If a project weakness says:

"lacks caching"

then caching is NOT implemented.

If an improvement says:

"add Redis"

then Redis is NOT implemented.

Never treat weaknesses or improvements as implemented features.

==================================================
CLONE
==================================================

If the project is a clone, replica or recreated application:

type = "Clone"

A clone can still have technical depth.

However uniqueness must remain low.

Do not classify a clone as Advanced simply because
it uses:

React
Node.js
Express
MongoDB
JWT
CRUD
REST API
MVC

==================================================
BASIC
==================================================

Common beginner projects should normally be:

type = "Common Utility"
level = "Basic"

Examples:

Weather App
Calculator
Todo App
Simple Portfolio
Basic CRUD
Basic API project

unless there is clear evidence of substantial
additional engineering.

==================================================
ADVANCED
==================================================

Use Advanced only with strong evidence such as:

Redis
implemented caching
WebSockets
real-time architecture
microservices
AI/ML
recommendation systems
payment systems
queues
event-driven architecture
performance optimization
rate limiting
Docker/Kubernetes
substantial security engineering

Do not use Advanced only because many technologies
are listed.

==================================================
LANGUAGE ERRORS
==================================================

Check actual:

- spelling errors
- grammar errors
- punctuation errors
- repeated words

Do NOT count these as language errors:

- missing professional summary
- certification naming inconsistency
- weak project
- clone project
- missing metrics

==================================================
RESUME CHECKS
==================================================

Check:

Contact:
- name
- email
- phone
- LinkedIn
- GitHub
- portfolio

Sections:
- summary
- education
- experience
- projects
- skills
- certifications
- achievements

Formatting:
- headings
- dates
- bullets
- spacing
- punctuation
- consistency
- readability

Content:
- action verbs
- quantified achievements
- technical contribution
- weak statements
- repetition
- project descriptions
- experience descriptions

==================================================
RETURN ONLY JSON
==================================================

{
    "summary": "",

    "detectedSkills": [],

    "sections": [],

    "checks": {
        "hasName": false,
        "hasEmail": false,
        "hasPhone": false,
        "hasLinkedIn": false,
        "hasGitHub": false,
        "hasPortfolio": false,

        "hasSummary": false,
        "hasEducation": false,
        "hasExperience": false,
        "hasProjects": false,
        "hasSkills": false,
        "hasCertifications": false,
        "hasAchievements": false,

        "standardHeadings": true,
        "readableLayout": true,
        "consistentDates": true,
        "consistentBullets": true,

        "hasActionVerbs": false,
        "hasQuantifiedAchievements": false,
        "hasWeakStatements": false,
        "hasRepetition": false,

        "projectTechnologies": false,
        "projectDescriptions": false,
        "experienceDescriptions": false,
        "hasTechnicalContribution": false
    },

    "counts": {
        "skills": 0,
        "grammarErrors": 0,
        "spellingErrors": 0,
        "punctuationErrors": 0,
        "weakStatements": 0,
        "repeatedWords": 0,
        "longBullets": 0,
        "quantifiedBullets": 0
    },

    "projects": [],

    "issues": [],

    "strengths": []
}

PROJECT FORMAT:

{
    "name": "",
    "type": "Other",
    "level": "Basic",
    "technicalDepth": 0,
    "problemSolving": 0,
    "uniqueness": 0,
    "resumeQuality": 0,
    "technologies": [],
    "strengths": [],
    "weaknesses": [],
    "improvements": []
}

ISSUE FORMAT:

{
    "title": "",
    "severity": "minor",
    "category": "",
    "problem": "",
    "reason": "",
    "fix": ""
}

==================================================
STRICT RULE
==================================================

Only give credit for things actually present
in the resume.

Never treat a missing feature as an implemented feature.

Never invent metrics.

Never invent technologies.

Never inflate project quality because of technology
quantity.

Never inflate language errors.
`;



                // GEMINI


                const response =
                    await ai.models.generateContent({

                        model:
                            "gemini-3.5-flash-lite",

                        contents: [

                            {
                                inlineData: {
                                    mimeType:
                                        "application/pdf",
                                    data:
                                        pdfBuffer.toString(
                                            "base64"
                                        )
                                }
                            },

                            {
                                text: prompt
                            }
                        ],

                        config: {
                            responseMimeType:
                                "application/json",

                            temperature: 0
                        }
                    });


                let responseText =
                    response.text.trim();


                responseText =
                    responseText
                        .replace(
                            /^```json/i,
                            ""
                        )
                        .replace(
                            /^```/i,
                            ""
                        )
                        .replace(
                            /```$/i,
                            ""
                        )
                        .trim();


                data =
                    JSON.parse(
                        responseText
                    );


                fs.writeFileSync(
                    cacheFile,
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                );
            }


            // NORMALIZE

            const checks =
                data.checks || {};

            const counts =
                data.counts || {};

            const projects =
                safeArray(
                    data.projects
                ).map(
                    normalizeProject
                );

            const issues =
                safeArray(
                    data.issues
                );


            const detectedSkills =
                safeArray(
                    data.detectedSkills
                );


            // CONTACT / 5

            let contact = 0;

            if (checks.hasName)
                contact += 1;

            if (checks.hasEmail)
                contact += 1;

            if (checks.hasPhone)
                contact += 1;

            if (
                checks.hasLinkedIn ||
                checks.hasGitHub
            ) {
                contact += 1;
            }

            if (checks.hasPortfolio)
                contact += 1;


            // FORMATTING / 10

            let formatting = 0;

            if (checks.standardHeadings)
                formatting += 3;

            if (checks.readableLayout)
                formatting += 3;

            if (checks.consistentDates)
                formatting += 2;

            if (checks.consistentBullets)
                formatting += 2;


            // Real formatting issue
            const formattingIssues =
                issues.filter(issue => {

                    const issueText =
                        [
                            issue.title,
                            issue.category,
                            issue.problem
                        ]
                            .join(" ")
                            .toLowerCase();

                    return (
                        issueText.includes("spacing") ||
                        issueText.includes("formatting") ||
                        issueText.includes("bullet")
                    );
                });


            if (
                formattingIssues.length > 0
            ) {
                formatting -= 1;
            }


            formatting =
                Math.max(
                    0,
                    Math.min(
                        formatting,
                        10
                    )
                );


            // CONTENT / 10

            let content = 0;

            if (checks.hasSummary)
                content += 1;

            if (checks.hasActionVerbs)
                content += 2;

            if (!checks.hasWeakStatements)
                content += 2;

            if (!checks.hasRepetition)
                content += 1;

            if (checks.projectDescriptions)
                content += 2;

            if (checks.experienceDescriptions)
                content += 2;


            content =
                Math.min(
                    content,
                    10
                );


            // SKILLS / 10

            let skills = 0;

            if (checks.hasSkills)
                skills += 3;


            // Quantity gives limited credit.
            if (
                detectedSkills.length >= 8
            ) {
                skills += 1;
            }

            if (
                detectedSkills.length >= 15
            ) {
                skills += 1;
            }


            // Evidence matters more.
            if (
                checks.projectTechnologies
            ) {
                skills += 2;
            }

            if (
                checks.hasTechnicalContribution
            ) {
                skills += 2;
            }

            if (
                checks.hasExperience
            ) {
                skills += 1;
            }


            skills =
                Math.min(
                    skills,
                    10
                );


            // EXPERIENCE / 15

            let experience = 0;

            if (checks.hasExperience)
                experience += 4;

            if (checks.experienceDescriptions)
                experience += 3;

            if (checks.hasTechnicalContribution)
                experience += 3;

            if (checks.hasActionVerbs)
                experience += 2;

            if (checks.hasQuantifiedAchievements)
                experience += 3;


            experience =
                Math.min(
                    experience,
                    15
                );


            // PROJECTS / 25

            const projectsScore =
                calculateProjectScore(
                    projects
                );


            // PROBLEM SOLVING / 10

            const problemSolving =
                calculateProblemSolving(
                    projects,
                    checks
                );


            // EDUCATION / 5

            let education = 0;

            if (checks.hasEducation)
                education += 3;

            if (checks.consistentDates)
                education += 1;

            if (checks.readableLayout)
                education += 1;


            education =
                Math.min(
                    education,
                    5
                );


            // LANGUAGE / 5
            // IMPORTANT:
            // USE VISIBLE ISSUES + COUNTS.
            // Do not allow random hidden AI counts
            // to reduce it to zero.

            let language = 5;


            const visibleLanguageIssues =
                issues.filter(issue => {

                    const issueText =
                        [
                            issue.title,
                            issue.category,
                            issue.problem
                        ]
                            .join(" ")
                            .toLowerCase();

                    return (
                        issueText.includes("spelling") ||
                        issueText.includes("grammar") ||
                        issueText.includes("punctuation") ||
                        issueText.includes("spacing") ||
                        issueText.includes("language") ||
                        issueText.includes("repeated word")
                    );
                });


            /*
                Visible issues are the primary source.

                Current resume:
                spelling issue = 1
                spacing/punctuation issue = 1

                Therefore:
                Language = 3/5
            */

            const visibleLanguageCount =
                Math.min(
                    visibleLanguageIssues.length,
                    5
                );


            language -=
                visibleLanguageCount;


            /*
                If AI did not return the issue in the
                visible issue list, use counts carefully.
            */

            if (
                visibleLanguageCount === 0
            ) {

                if (
                    Number(
                        counts.spellingErrors || 0
                    ) > 0
                ) {
                    language -= 1;
                }

                if (
                    Number(
                        counts.grammarErrors || 0
                    ) > 0
                ) {
                    language -= 1;
                }

                if (
                    Number(
                        counts.punctuationErrors || 0
                    ) > 0
                ) {
                    language -= 1;
                }
            }


            language =
                Math.max(
                    0,
                    Math.min(
                        language,
                        5
                    )
                );


            // READABILITY / 5

            let readability = 5;

            if (
                !checks.readableLayout
            ) {
                readability -= 2;
            }

            if (
                !checks.consistentBullets
            ) {
                readability -= 1;
            }

            if (
                Number(
                    counts.longBullets || 0
                ) > 0
            ) {
                readability -= 1;
            }

            if (
                checks.hasRepetition
            ) {
                readability -= 1;
            }


            readability =
                Math.max(
                    0,
                    readability
                );


            // ISSUE PENALTY

            let issuePenalty = 0;


            issues.forEach(issue => {

                const category =
                    lower(issue.category);

                const title =
                    lower(issue.title);


                // Language already handled above.
                const isLanguage =
                    category.includes("language") ||
                    category.includes("spelling") ||
                    category.includes("grammar") ||
                    category.includes("punctuation") ||
                    title.includes("spelling error") ||
                    title.includes("grammar error");


                if (isLanguage) {
                    return;
                }


                const severity =
                    lower(issue.severity);


                if (
                    severity === "major"
                ) {
                    issuePenalty += 3;
                }
                else if (
                    severity === "medium"
                ) {
                    issuePenalty += 2;
                }
                else {
                    issuePenalty += 1;
                }
            });


            issuePenalty =
                Math.min(
                    issuePenalty,
                    7
                );


            // FINAL ATS SCORE

            let atsScore =
                contact +
                formatting +
                content +
                skills +
                experience +
                projectsScore +
                problemSolving +
                education +
                language +
                readability -
                issuePenalty;


            atsScore =
                Math.round(
                    Math.max(
                        0,
                        Math.min(
                            atsScore,
                            100
                        )
                    )
                );


            // RATING

            let rating =
                "Needs Improvement";

            if (atsScore >= 85) {
                rating = "Excellent";
            }
            else if (atsScore >= 75) {
                rating = "Very Good";
            }
            else if (atsScore >= 65) {
                rating = "Good";
            }
            else if (atsScore >= 50) {
                rating = "Fair";
            }


            // PROJECT WARNINGS

            const projectWarnings =
                projects.map(project => {

                    const warnings = [];


                    if (
                        project.type === "Clone"
                    ) {
                        warnings.push(
                            "Clone project. Technical implementation may be useful, but originality is limited."
                        );
                    }


                    if (
                        project.level === "Basic"
                    ) {
                        warnings.push(
                            "Basic/common project with limited technical complexity."
                        );
                    }


                    if (
                        project.technicalDepth < 5
                    ) {
                        warnings.push(
                            "Technical depth is limited."
                        );
                    }


                    if (
                        project.problemSolving < 3
                    ) {
                        warnings.push(
                            "Limited evidence of meaningful problem solving."
                        );
                    }


                    if (
                        project.uniqueness < 3
                    ) {
                        warnings.push(
                            "Limited originality or customization."
                        );
                    }


                    return {
                        name:
                            project.name,
                        warnings
                    };
                });


            // RESPONSE

            return res.json({

                message:
                    "Resume analyzed successfully",

                fileName,

                atsScore,

                rating,

                summary:
                    data.summary || "",

                detectedSkills,

                sections:
                    safeArray(
                        data.sections
                    ),

                strengths:
                    safeArray(
                        data.strengths
                    ),

                issues,

                projects,

                projectWarnings,

                weaknesses:
                    issues.map(issue => ({
                        issue:
                            issue.title || "",

                        reason:
                            issue.problem ||
                            issue.reason ||
                            ""
                    })),

                suggestions:
                    issues.map(issue => ({
                        problem:
                            issue.title || "",

                        solution:
                            issue.fix || ""
                    })),

                atsBreakdown: {

                    contact,

                    formatting,

                    content,

                    skills,

                    experience,

                    projects:
                        projectsScore,

                    problemSolving,

                    education,

                    language,

                    readability
                },

                breakdownMaximum: {

                    contact: 5,

                    formatting: 10,

                    content: 10,

                    skills: 10,

                    experience: 15,

                    projects: 25,

                    problemSolving: 10,

                    education: 5,

                    language: 5,

                    readability: 5
                },

                counts,

                issuePenalty,

                cached
            });

        } catch (error) {

            console.error(
                "RESUME ANALYSIS ERROR:",
                error
            );

            return res.status(500).json({

                message:
                    "Resume analysis failed",

                error:
                    error.message
            });
        }
    }
);


module.exports = router;