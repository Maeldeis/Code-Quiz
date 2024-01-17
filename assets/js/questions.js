
var questions = [
    {
        question: "what does js stand for",
        choices: ["javascript", "just saying"],
        correctAnswer: "javascript"
    },
    {
        question: "what is the purpose of javascript",
        choices: ["for readability", "to add dynamic content"],
        correctAnswer: "to add dynamic content"
    },
    {
        question: "when was javascript invented",
        choices: ["1999", "1995"],
        correctAnswer: "1995"
    }
];

questions.sort(() => Math.random() - 0.5);
