// Array var object
var questions = [
    {
        question: "what",
        choices: ["x", "y"],
        answer: "x"
    },
    {
        question: "what2",
        choices: ["x", "y"],
        answer: "y"
    },
    {
        question: "what3",
        choices: ["x", "y"],
        answer: "y"
    }
];
questions.sort(() => Math.random() - 0.5);
