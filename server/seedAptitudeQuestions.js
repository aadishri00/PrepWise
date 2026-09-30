const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Question = require("./models/Question");

dotenv.config();

const questions = [

   
    // QUANTITATIVE APTITUDE
   

    {
        question: "What is 20% of 250?",
        options: ["40", "50", "60", "70"],
        correctAnswer: "50",
        category: "Quantitative Aptitude"
    },
    {
        question: "If a number is increased by 20% and becomes 240, what was the original number?",
        options: ["180", "200", "220", "240"],
        correctAnswer: "200",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is 25% of 400?",
        options: ["50", "75", "100", "125"],
        correctAnswer: "100",
        category: "Quantitative Aptitude"
    },
    {
        question: "A product costs ₹500 and is sold for ₹600. What is the profit percentage?",
        options: ["10%", "15%", "20%", "25%"],
        correctAnswer: "20%",
        category: "Quantitative Aptitude"
    },
    {
        question: "A product is bought for ₹800 and sold for ₹720. What is the loss percentage?",
        options: ["5%", "10%", "15%", "20%"],
        correctAnswer: "10%",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the average of 10, 20, 30, 40 and 50?",
        options: ["20", "25", "30", "35"],
        correctAnswer: "30",
        category: "Quantitative Aptitude"
    },
    {
        question: "The ratio of two numbers is 2:3. If their sum is 50, what is the smaller number?",
        options: ["10", "20", "25", "30"],
        correctAnswer: "20",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the HCF of 24 and 36?",
        options: ["6", "8", "12", "18"],
        correctAnswer: "12",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the LCM of 8 and 12?",
        options: ["16", "20", "24", "36"],
        correctAnswer: "24",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the simple interest on ₹1000 at 10% per annum for 2 years?",
        options: ["₹100", "₹150", "₹200", "₹250"],
        correctAnswer: "₹200",
        category: "Quantitative Aptitude"
    },
    {
        question: "A train travels 120 km in 2 hours. What is its speed?",
        options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
        correctAnswer: "60 km/h",
        category: "Quantitative Aptitude"
    },
    {
        question: "If a car travels at 50 km/h for 4 hours, what distance does it cover?",
        options: ["150 km", "200 km", "250 km", "300 km"],
        correctAnswer: "200 km",
        category: "Quantitative Aptitude"
    },
    {
        question: "A can complete a work in 10 days. How much work does A complete in one day?",
        options: ["1/5", "1/10", "1/15", "1/20"],
        correctAnswer: "1/10",
        category: "Quantitative Aptitude"
    },
    {
        question: "If 5 workers complete a job in 12 days, how many worker-days are required?",
        options: ["50", "60", "70", "80"],
        correctAnswer: "60",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the square of 15?",
        options: ["125", "200", "225", "250"],
        correctAnswer: "225",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the cube of 4?",
        options: ["16", "32", "64", "128"],
        correctAnswer: "64",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is 3/4 of 80?",
        options: ["40", "50", "60", "70"],
        correctAnswer: "60",
        category: "Quantitative Aptitude"
    },
    {
        question: "If 5 pens cost ₹100, what is the cost of 8 pens?",
        options: ["₹120", "₹140", "₹160", "₹180"],
        correctAnswer: "₹160",
        category: "Quantitative Aptitude"
    },
    {
        question: "A number divided by 5 gives 12. What is the number?",
        options: ["50", "55", "60", "65"],
        correctAnswer: "60",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is 15% of 600?",
        options: ["60", "75", "90", "120"],
        correctAnswer: "90",
        category: "Quantitative Aptitude"
    },
    {
        question: "If the selling price is ₹1200 and profit is ₹200, what is the cost price?",
        options: ["₹900", "₹1000", "₹1100", "₹1200"],
        correctAnswer: "₹1000",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the next number: 2, 4, 8, 16, ?",
        options: ["20", "24", "32", "36"],
        correctAnswer: "32",
        category: "Quantitative Aptitude"
    },
    {
        question: "What is the next number: 5, 10, 15, 20, ?",
        options: ["22", "25", "30", "35"],
        correctAnswer: "25",
        category: "Quantitative Aptitude"
    },
    {
        question: "If x + 5 = 15, what is x?",
        options: ["5", "10", "15", "20"],
        correctAnswer: "10",
        category: "Quantitative Aptitude"
    },
    {
        question: "If 3x = 27, what is x?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "9",
        category: "Quantitative Aptitude"
    },


   
    // LOGICAL REASONING
   

    {
        question: "Find the next number: 2, 4, 6, 8, ?",
        options: ["9", "10", "12", "14"],
        correctAnswer: "10",
        category: "Logical Reasoning"
    },
    {
        question: "Find the next number: 3, 6, 12, 24, ?",
        options: ["36", "42", "48", "54"],
        correctAnswer: "48",
        category: "Logical Reasoning"
    },
    {
        question: "Find the odd one out.",
        options: ["Apple", "Mango", "Banana", "Carrot"],
        correctAnswer: "Carrot",
        category: "Logical Reasoning"
    },
    {
        question: "If CAT is coded as DBU, how is DOG coded?",
        options: ["EPH", "EOG", "DPH", "FPH"],
        correctAnswer: "EPH",
        category: "Logical Reasoning"
    },
    {
        question: "If A = 1, B = 2, C = 3, what is the value of CAB?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "6",
        category: "Logical Reasoning"
    },
    {
        question: "Ravi is facing North. He turns right. Which direction is he facing?",
        options: ["South", "East", "West", "North"],
        correctAnswer: "East",
        category: "Logical Reasoning"
    },
    {
        question: "Ravi is facing East. He turns left. Which direction is he facing?",
        options: ["North", "South", "West", "East"],
        correctAnswer: "North",
        category: "Logical Reasoning"
    },
    {
        question: "A is the brother of B. B is the sister of C. How is A related to C?",
        options: ["Brother", "Sister", "Father", "Uncle"],
        correctAnswer: "Brother",
        category: "Logical Reasoning"
    },
    {
        question: "If all roses are flowers and some flowers are red, which statement is definitely true?",
        options: [
            "All roses are red",
            "Roses are flowers",
            "All flowers are roses",
            "No rose is red"
        ],
        correctAnswer: "Roses are flowers",
        category: "Logical Reasoning"
    },
    {
        question: "Find the next number: 1, 4, 9, 16, ?",
        options: ["20", "24", "25", "30"],
        correctAnswer: "25",
        category: "Logical Reasoning"
    },
    {
        question: "Find the missing letter: A, C, E, G, ?",
        options: ["H", "I", "J", "K"],
        correctAnswer: "I",
        category: "Logical Reasoning"
    },
    {
        question: "Find the missing letter: B, D, F, H, ?",
        options: ["I", "J", "K", "L"],
        correctAnswer: "J",
        category: "Logical Reasoning"
    },
    {
        question: "Book is to Reading as Fork is to:",
        options: ["Writing", "Eating", "Cooking", "Drawing"],
        correctAnswer: "Eating",
        category: "Logical Reasoning"
    },
    {
        question: "Doctor is to Hospital as Teacher is to:",
        options: ["School", "Market", "Bank", "Court"],
        correctAnswer: "School",
        category: "Logical Reasoning"
    },
    {
        question: "Which number does not belong? 2, 3, 5, 7, 9",
        options: ["2", "5", "7", "9"],
        correctAnswer: "9",
        category: "Logical Reasoning"
    },
    {
        question: "If today is Monday, what day will it be after 3 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        correctAnswer: "Thursday",
        category: "Logical Reasoning"
    },
    {
        question: "If yesterday was Friday, what day is tomorrow?",
        options: ["Saturday", "Sunday", "Monday", "Thursday"],
        correctAnswer: "Sunday",
        category: "Logical Reasoning"
    },
    {
        question: "A is taller than B. B is taller than C. Who is shortest?",
        options: ["A", "B", "C", "Cannot determine"],
        correctAnswer: "C",
        category: "Logical Reasoning"
    },
    {
        question: "If P is older than Q and Q is older than R, who is youngest?",
        options: ["P", "Q", "R", "Cannot determine"],
        correctAnswer: "R",
        category: "Logical Reasoning"
    },
    {
        question: "Find the next number: 10, 20, 40, 80, ?",
        options: ["100", "120", "160", "180"],
        correctAnswer: "160",
        category: "Logical Reasoning"
    },
    {
        question: "Find the next number: 100, 90, 80, 70, ?",
        options: ["50", "55", "60", "65"],
        correctAnswer: "60",
        category: "Logical Reasoning"
    },
    {
        question: "Which word cannot be formed from the letters of COMPUTER?",
        options: ["MUTE", "COME", "TERM", "PUT"],
        correctAnswer: "TERM",
        category: "Logical Reasoning"
    },
    {
        question: "If PEN is coded as QFO, how is BOOK coded?",
        options: ["CPPL", "CQQM", "APPL", "DPPL"],
        correctAnswer: "CPPL",
        category: "Logical Reasoning"
    },
    {
        question: "A person walks 5 km North and then 5 km South. How far is he from the starting point?",
        options: ["0 km", "5 km", "10 km", "15 km"],
        correctAnswer: "0 km",
        category: "Logical Reasoning"
    },
    {
        question: "Which is different from the others?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correctAnswer: "Circle",
        category: "Logical Reasoning"
    },


   
    // VERBAL ABILITY
   

    {
        question: "Choose the synonym of 'Happy'.",
        options: ["Sad", "Joyful", "Angry", "Weak"],
        correctAnswer: "Joyful",
        category: "Verbal Ability"
    },
    {
        question: "Choose the antonym of 'Hot'.",
        options: ["Warm", "Cold", "Heat", "Boiling"],
        correctAnswer: "Cold",
        category: "Verbal Ability"
    },
    {
        question: "Choose the synonym of 'Big'.",
        options: ["Small", "Large", "Short", "Thin"],
        correctAnswer: "Large",
        category: "Verbal Ability"
    },
    {
        question: "Choose the antonym of 'Early'.",
        options: ["Fast", "Late", "Quick", "Soon"],
        correctAnswer: "Late",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct spelling.",
        options: ["Recieve", "Receive", "Receeve", "Receve"],
        correctAnswer: "Receive",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct spelling.",
        options: ["Necessary", "Necesary", "Neccessary", "Necessery"],
        correctAnswer: "Necessary",
        category: "Verbal Ability"
    },
    {
        question: "Fill in the blank: She ___ to school every day.",
        options: ["go", "goes", "going", "gone"],
        correctAnswer: "goes",
        category: "Verbal Ability"
    },
    {
        question: "Fill in the blank: They ___ playing cricket.",
        options: ["is", "am", "are", "was"],
        correctAnswer: "are",
        category: "Verbal Ability"
    },
    {
        question: "Fill in the blank: I ___ a student.",
        options: ["is", "am", "are", "be"],
        correctAnswer: "am",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct sentence.",
        options: [
            "He don't like tea.",
            "He doesn't like tea.",
            "He doesn't likes tea.",
            "He not like tea."
        ],
        correctAnswer: "He doesn't like tea.",
        category: "Verbal Ability"
    },
    {
        question: "Choose the synonym of 'Brave'.",
        options: ["Coward", "Courageous", "Weak", "Afraid"],
        correctAnswer: "Courageous",
        category: "Verbal Ability"
    },
    {
        question: "Choose the antonym of 'Difficult'.",
        options: ["Hard", "Easy", "Tough", "Complex"],
        correctAnswer: "Easy",
        category: "Verbal Ability"
    },
    {
        question: "Choose the synonym of 'Quick'.",
        options: ["Slow", "Fast", "Late", "Weak"],
        correctAnswer: "Fast",
        category: "Verbal Ability"
    },
    {
        question: "Choose the antonym of 'Ancient'.",
        options: ["Old", "Modern", "Historic", "Past"],
        correctAnswer: "Modern",
        category: "Verbal Ability"
    },
    {
        question: "A person who writes books is called a:",
        options: ["Author", "Editor", "Reader", "Publisher"],
        correctAnswer: "Author",
        category: "Verbal Ability"
    },
    {
        question: "A person who treats sick people is called a:",
        options: ["Teacher", "Doctor", "Engineer", "Lawyer"],
        correctAnswer: "Doctor",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct article: He is ___ honest man.",
        options: ["a", "an", "the", "no article"],
        correctAnswer: "an",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct article: I saw ___ elephant.",
        options: ["a", "an", "the", "no article"],
        correctAnswer: "an",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct preposition: The book is ___ the table.",
        options: ["in", "on", "at", "by"],
        correctAnswer: "on",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct preposition: He lives ___ Delhi.",
        options: ["on", "at", "in", "by"],
        correctAnswer: "in",
        category: "Verbal Ability"
    },
    {
        question: "Choose the synonym of 'Begin'.",
        options: ["End", "Start", "Stop", "Finish"],
        correctAnswer: "Start",
        category: "Verbal Ability"
    },
    {
        question: "Choose the antonym of 'Accept'.",
        options: ["Receive", "Reject", "Take", "Allow"],
        correctAnswer: "Reject",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct sentence.",
        options: [
            "She have a car.",
            "She has a car.",
            "She having a car.",
            "She had have a car."
        ],
        correctAnswer: "She has a car.",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct plural of 'Child'.",
        options: ["Childs", "Children", "Childes", "Childrens"],
        correctAnswer: "Children",
        category: "Verbal Ability"
    },
    {
        question: "Choose the correct plural of 'Mouse'.",
        options: ["Mouses", "Mice", "Mousees", "Meese"],
        correctAnswer: "Mice",
        category: "Verbal Ability"
    },


   
    // DATA INTERPRETATION
   

    {
        question: "A company sold 100 units in January and 150 units in February. What was the increase?",
        options: ["25", "40", "50", "60"],
        correctAnswer: "50",
        category: "Data Interpretation"
    },
    {
        question: "A shop sold 200 items in a day. If 25% were defective, how many were defective?",
        options: ["25", "40", "50", "75"],
        correctAnswer: "50",
        category: "Data Interpretation"
    },
    {
        question: "A school has 500 students. 60% are boys. How many boys are there?",
        options: ["250", "300", "350", "400"],
        correctAnswer: "300",
        category: "Data Interpretation"
    },
    {
        question: "A company has 800 employees. 25% work in HR. How many employees work in HR?",
        options: ["100", "150", "200", "250"],
        correctAnswer: "200",
        category: "Data Interpretation"
    },
    {
        question: "A store earned ₹10,000 in Monday and ₹15,000 in Tuesday. What is the total earning?",
        options: ["₹20,000", "₹25,000", "₹30,000", "₹35,000"],
        correctAnswer: "₹25,000",
        category: "Data Interpretation"
    },
    {
        question: "A student scored 80, 70 and 90 in three tests. What is the average?",
        options: ["70", "75", "80", "85"],
        correctAnswer: "80",
        category: "Data Interpretation"
    },
    {
        question: "A factory produces 500 units daily. How many units will it produce in 4 days?",
        options: ["1000", "1500", "2000", "2500"],
        correctAnswer: "2000",
        category: "Data Interpretation"
    },
    {
        question: "A company revenue increased from ₹20 lakh to ₹25 lakh. What was the increase?",
        options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"],
        correctAnswer: "₹5 lakh",
        category: "Data Interpretation"
    },
    {
        question: "A class has 40 students and 30 passed. What percentage passed?",
        options: ["50%", "60%", "75%", "80%"],
        correctAnswer: "75%",
        category: "Data Interpretation"
    },
    {
        question: "A shop has 120 products. 40 are electronics. What percentage are electronics?",
        options: ["25%", "30%", "33.33%", "40%"],
        correctAnswer: "33.33%",
        category: "Data Interpretation"
    },
    {
        question: "A bus carries 50 passengers. 20 get down. How many remain?",
        options: ["20", "25", "30", "35"],
        correctAnswer: "30",
        category: "Data Interpretation"
    },
    {
        question: "A company has 1000 customers. 300 are new customers. What percentage are new?",
        options: ["20%", "25%", "30%", "35%"],
        correctAnswer: "30%",
        category: "Data Interpretation"
    },
    {
        question: "A student studies 4 hours daily. How many hours in 7 days?",
        options: ["21", "24", "28", "32"],
        correctAnswer: "28",
        category: "Data Interpretation"
    },
    {
        question: "A car travels 300 km using 20 litres of fuel. How many km per litre?",
        options: ["10", "12", "15", "20"],
        correctAnswer: "15",
        category: "Data Interpretation"
    },
    {
        question: "A team scored 120 runs in the first innings and 180 in the second. Total score?",
        options: ["250", "280", "300", "320"],
        correctAnswer: "300",
        category: "Data Interpretation"
    },
    {
        question: "A library has 2000 books. 500 are science books. What percentage are science books?",
        options: ["20%", "25%", "30%", "40%"],
        correctAnswer: "25%",
        category: "Data Interpretation"
    },
    {
        question: "A company's sales were ₹50 lakh last year and ₹60 lakh this year. Increase is:",
        options: ["₹5 lakh", "₹10 lakh", "₹15 lakh", "₹20 lakh"],
        correctAnswer: "₹10 lakh",
        category: "Data Interpretation"
    },
    {
        question: "A student answered 45 out of 50 questions correctly. How many were incorrect?",
        options: ["3", "5", "7", "10"],
        correctAnswer: "5",
        category: "Data Interpretation"
    },
    {
        question: "A product price is ₹1000 and discount is 20%. What is the selling price?",
        options: ["₹700", "₹750", "₹800", "₹850"],
        correctAnswer: "₹800",
        category: "Data Interpretation"
    },
    {
        question: "A company has 600 employees and 100 leave the company. How many remain?",
        options: ["400", "450", "500", "550"],
        correctAnswer: "500",
        category: "Data Interpretation"
    },
    {
        question: "A shop sells 40 units on Monday, 50 on Tuesday and 60 on Wednesday. Total?",
        options: ["120", "140", "150", "160"],
        correctAnswer: "150",
        category: "Data Interpretation"
    },
    {
        question: "A student gets 72 marks out of 100. What is the percentage?",
        options: ["62%", "68%", "72%", "78%"],
        correctAnswer: "72%",
        category: "Data Interpretation"
    },
    {
        question: "A factory produced 900 units and exported 300. What percentage was exported?",
        options: ["25%", "33.33%", "40%", "50%"],
        correctAnswer: "33.33%",
        category: "Data Interpretation"
    },
    {
        question: "A person earns ₹40,000 and saves ₹10,000. What percentage of income is saved?",
        options: ["20%", "25%", "30%", "35%"],
        correctAnswer: "25%",
        category: "Data Interpretation"
    },
    {
        question: "A school has 800 students. 400 are girls. What percentage are girls?",
        options: ["40%", "45%", "50%", "60%"],
        correctAnswer: "50%",
        category: "Data Interpretation"
    }

];


// =========================================================
// INSERT QUESTIONS
// =========================================================

const seedQuestions = async () => {

    try {

        await connectDB();

        console.log("MongoDB connected");


        await Question.deleteMany({});

        console.log("Old questions deleted");


        await Question.insertMany(questions);

        console.log(
            `${questions.length} aptitude questions inserted successfully`
        );


        console.log(
            "Aptitude question bank is ready!"
        );


        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {

        console.log(
            "SEED ERROR:",
            error
        );

        await mongoose.connection.close();

        process.exit(1);
    }
};


seedQuestions();