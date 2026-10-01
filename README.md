PrepWise

PrepWise is a full-stack placement preparation platform built for students preparing for software development roles. It brings aptitude practice, coding assessments, resume analysis, mock interviews, progress tracking, and profile management into one application.

The project was built as a practical MERN application with a focus on authentication, assessment workflows, AI-assisted features, and a clean user experience.

Live Demo

Frontend: https://prep-wise-kappa-two.vercel.app

Backend API: https://prepwise-6474.onrender.com

The free backend may take a few seconds to wake up after a period of inactivity.

Features

Student Features

User registration and secure login

JWT-based authentication with HTTP-only cookies

Student profile management

Resume PDF upload

AI-powered resume feedback

Aptitude practice tests

Aptitude test history

Java coding assessments

Hidden test case evaluation

Coding result history

Progress dashboard

AI mock interviews

Technical, HR, and mock interview sections

Responsive interface for desktop and mobile

Admin Features

Admin authentication and protected dashboard

Platform statistics

User management

Promote users to admin

Delete users

Add and manage aptitude questions

Add and manage coding questions

Coding question difficulty and category management

Tech Stack

Frontend

React.js

Vite

Tailwind CSS

React Router

Axios

Recharts

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcryptjs

Multer

AI

Google Gemini API

Deployment

Vercel — Frontend

Render — Backend

MongoDB Atlas — Database

Project Structure

PrepWise/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
└── README.md

How It Works

A student creates an account and logs in.

The student completes their profile and uploads a resume.

Aptitude and coding assessments can be attempted from the dashboard.

Coding submissions are checked against hidden test cases.

Results are stored and shown in the respective history sections.

AI features provide resume feedback and conduct mock interview sessions.

Progress can be tracked from the dashboard.

The frontend will normally run at:

http://localhost:5173

The backend will normally run at:

http://localhost:5000

Security

Passwords are hashed using bcryptjs.

Authentication uses JWT stored in HTTP-only cookies.

Protected API routes require authentication.

Admin routes use role-based access control.

Resume uploads are restricted to PDF files and have a file-size limit.

Environment variables are used for database credentials and API keys.

Deployment

The production setup uses:

Vercel for the React frontend

Render for the Node.js/Express backend

MongoDB Atlas for MongoDB

Gemini API for AI functionality

For production, the frontend API URL points to the deployed Render backend and the backend CORS configuration allows the deployed Vercel frontend.

Future Improvements

Cloud storage for permanent resume storage

More coding problems and test cases

Detailed interview analytics

Resume version history

Admin analytics and reporting

More assessment categories

Improved AI interview evaluation

Email notifications

Custom domain

Author

Aditya Shrikant Gangwar

B.Tech — Computer Science & Engineering

Interested in full-stack development, backend development, and building practical web applications.

License

This project is intended for learning, portfolio, and demonstration purposes.