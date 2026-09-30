const dotenv = require("dotenv");
const connectDB = require("./config/db");
const InterviewQuestion = require("./models/InterviewQuestion");

dotenv.config();

const questions = [

    // Java

    {
        category: "Java",
        question: "What is Java?",
        answer: "Java is a high-level, object-oriented programming language used to build applications for web, desktop and enterprise systems."
    },

    {
        category: "Java",
        question: "What is OOP?",
        answer: "OOP stands for Object-Oriented Programming. Its main concepts are Encapsulation, Inheritance, Polymorphism and Abstraction."
    },

    {
        category: "Java",
        question: "What is inheritance?",
        answer: "Inheritance allows one class to acquire properties and methods of another class."
    },

    {
        category: "Java",
        question: "What is polymorphism?",
        answer: "Polymorphism means one interface or method can have different forms. Method overloading and overriding are examples."
    },

    {
        category: "Java",
        question: "What is method overloading?",
        answer: "Method overloading means having multiple methods with the same name but different parameters."
    },

    {
        category: "Java",
        question: "What is method overriding?",
        answer: "Method overriding occurs when a child class provides its own implementation of a parent class method."
    },

    {
        category: "Java",
        question: "What is JVM?",
        answer: "JVM stands for Java Virtual Machine. It executes Java bytecode."
    },

    {
        category: "Java",
        question: "What is JDK?",
        answer: "JDK is Java Development Kit. It contains tools required to develop and run Java programs."
    },

    {
        category: "Java",
        question: "What is JRE?",
        answer: "JRE is Java Runtime Environment. It provides the environment required to run Java applications."
    },

    {
        category: "Java",
        question: "What is an exception?",
        answer: "An exception is an unexpected event that interrupts the normal flow of program execution."
    },


    // JavaScript

    {
        category: "JavaScript",
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language mainly used to make web pages interactive and dynamic."
    },

    {
        category: "JavaScript",
        question: "What is the difference between let, const and var?",
        answer: "var is function scoped, while let and const are block scoped. const cannot be reassigned."
    },

    {
        category: "JavaScript",
        question: "What is a closure?",
        answer: "A closure is created when a function remembers variables from its outer scope even after the outer function has finished."
    },

    {
        category: "JavaScript",
        question: "What is hoisting?",
        answer: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during execution setup."
    },

    {
        category: "JavaScript",
        question: "What is a promise?",
        answer: "A Promise represents the eventual success or failure of an asynchronous operation."
    },

    {
        category: "JavaScript",
        question: "What is async/await?",
        answer: "Async/await is a simpler way to work with Promises and asynchronous code."
    },

    {
        category: "JavaScript",
        question: "What is the difference between == and ===?",
        answer: "== compares values after type conversion, while === compares both value and type."
    },

    {
        category: "JavaScript",
        question: "What is an arrow function?",
        answer: "An arrow function is a shorter syntax for writing functions and it does not have its own this."
    },

    {
        category: "JavaScript",
        question: "What is the DOM?",
        answer: "DOM stands for Document Object Model. It represents an HTML document as a tree of objects."
    },

    {
        category: "JavaScript",
        question: "What is event bubbling?",
        answer: "Event bubbling means an event moves from the target element upward through its parent elements."
    },


    // React

    {
        category: "React",
        question: "What is React?",
        answer: "React is a JavaScript library used to build user interfaces using reusable components."
    },

    {
        category: "React",
        question: "What is a component?",
        answer: "A component is a reusable piece of UI in React."
    },

    {
        category: "React",
        question: "What are props?",
        answer: "Props are data passed from a parent component to a child component."
    },

    {
        category: "React",
        question: "What is state?",
        answer: "State is data managed inside a component that can change over time."
    },

    {
        category: "React",
        question: "What is useState?",
        answer: "useState is a React Hook used to create and update component state."
    },

    {
        category: "React",
        question: "What is useEffect?",
        answer: "useEffect is a React Hook used for side effects such as API calls and event handling."
    },

    {
        category: "React",
        question: "What is Virtual DOM?",
        answer: "Virtual DOM is a lightweight representation of the real DOM that React uses to update the UI efficiently."
    },

    {
        category: "React",
        question: "What is React Router?",
        answer: "React Router is used to handle navigation and routing in React applications."
    },

    {
        category: "React",
        question: "What is conditional rendering?",
        answer: "Conditional rendering means displaying different UI based on a condition."
    },

    {
        category: "React",
        question: "What is lifting state up?",
        answer: "Lifting state up means moving shared state to the nearest common parent component."
    },


    // Node.js

    {
        category: "Node.js",
        question: "What is Node.js?",
        answer: "Node.js is a JavaScript runtime that allows JavaScript to run outside the browser."
    },

    {
        category: "Node.js",
        question: "What is npm?",
        answer: "npm is the Node Package Manager used to install and manage JavaScript packages."
    },

    {
        category: "Node.js",
        question: "What is Express.js?",
        answer: "Express.js is a lightweight Node.js framework used to build web servers and APIs."
    },

    {
        category: "Node.js",
        question: "What is middleware?",
        answer: "Middleware is a function that runs between the request and response cycle."
    },

    {
        category: "Node.js",
        question: "What is an API?",
        answer: "API stands for Application Programming Interface. It allows different software systems to communicate."
    },

    {
        category: "Node.js",
        question: "What is REST API?",
        answer: "REST API is an architectural style for building web services using HTTP methods such as GET, POST, PUT and DELETE."
    },

    {
        category: "Node.js",
        question: "What is the event loop?",
        answer: "The event loop allows Node.js to handle asynchronous operations without blocking the main thread."
    },

    {
        category: "Node.js",
        question: "What is JSON?",
        answer: "JSON is a lightweight data format commonly used for communication between frontend and backend."
    },

    {
        category: "Node.js",
        question: "What is CORS?",
        answer: "CORS is a browser security mechanism that controls requests between different origins."
    },

    {
        category: "Node.js",
        question: "What is JWT?",
        answer: "JWT is a token format commonly used for authentication and securely transferring user information."
    },


    // MongoDB

    {
        category: "MongoDB",
        question: "What is MongoDB?",
        answer: "MongoDB is a NoSQL database that stores data in flexible document structures."
    },

    {
        category: "MongoDB",
        question: "What is a collection?",
        answer: "A collection is a group of MongoDB documents, similar to a table in a relational database."
    },

    {
        category: "MongoDB",
        question: "What is a document?",
        answer: "A document is a MongoDB record stored in BSON format."
    },

    {
        category: "MongoDB",
        question: "What is Mongoose?",
        answer: "Mongoose is an ODM library that makes it easier to work with MongoDB from Node.js."
    },

    {
        category: "MongoDB",
        question: "What is ObjectId?",
        answer: "ObjectId is the default unique identifier used by MongoDB documents."
    },


    // DBMS

    {
        category: "DBMS",
        question: "What is DBMS?",
        answer: "DBMS stands for Database Management System. It is software used to store, manage and retrieve data."
    },

    {
        category: "DBMS",
        question: "What is a primary key?",
        answer: "A primary key uniquely identifies each record in a table."
    },

    {
        category: "DBMS",
        question: "What is a foreign key?",
        answer: "A foreign key is used to create a relationship between tables."
    },

    {
        category: "DBMS",
        question: "What is normalization?",
        answer: "Normalization is the process of organizing database tables to reduce data redundancy."
    },

    {
        category: "DBMS",
        question: "What is SQL?",
        answer: "SQL stands for Structured Query Language and is used to interact with relational databases."
    },


    // HR

    {
        category: "HR",
        question: "Tell me about yourself.",
        answer: "Give a short introduction covering your education, technical skills, projects, internship experience and career goal."
    },

    {
        category: "HR",
        question: "Why should we hire you?",
        answer: "Explain your relevant technical skills, projects, learning ability and how you can contribute to the company."
    },

    {
        category: "HR",
        question: "What are your strengths?",
        answer: "Mention genuine strengths such as problem solving, consistency, teamwork or willingness to learn with a short example."
    },

    {
        category: "HR",
        question: "What is your weakness?",
        answer: "Mention a genuine weakness and explain what you are doing to improve it."
    },

    {
        category: "HR",
        question: "Where do you see yourself in five years?",
        answer: "Explain how you want to grow technically and take greater responsibilities in your career."
    },

    {
        category: "HR",
        question: "Why do you want to join our company?",
        answer: "Talk about the company's work, learning opportunities, role and how they match your career goals."
    },

    {
        category: "HR",
        question: "Why did you choose computer science?",
        answer: "Explain your interest in technology, programming and solving real-world problems."
    },

    {
        category: "HR",
        question: "Are you comfortable working in a team?",
        answer: "Yes. Explain a project or situation where you worked with others and contributed to the result."
    },

    {
        category: "HR",
        question: "How do you handle pressure?",
        answer: "Explain how you prioritize tasks, stay organized and solve problems step by step."
    },

    {
        category: "HR",
        question: "Do you have any questions for us?",
        answer: "Ask about the role, team, technologies, learning opportunities or expectations from a fresher."
    }

];


const seedQuestions = async () => {

    try {

        await connectDB();

        await InterviewQuestion.deleteMany();

        await InterviewQuestion.insertMany(questions);

        console.log(
            `${questions.length} interview questions inserted`
        );

        process.exit(0);

    } catch (error) {

        console.log("SEED ERROR:", error);

        process.exit(1);
    }
};

seedQuestions();