// Array var object
export var questions = [
    {
        question: "what",
        choices: ["x", "y"],
        CorrectAnswer: "x"
    },
    {
        question: "what2",
        choices: ["x", "y"],
        CorrectAnswer: "y"
    },
    {
        question: "what3",
        choices: ["x", "y"],
        CorrectAnswer: "y"
    }
];
questions.sort(() => Math.random() - 0.5);
