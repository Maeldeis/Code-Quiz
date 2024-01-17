
var questions = [
    {
        question: "what does js stand for",
        choices: ["javascript", "just saying"],
        CorrectAnswer: "javascript"
    },
    {
        question: "what is the purpose of javascript",
        choices: ["for readability", "to add dynamic content"],
        CorrectAnswer: "to add dynamic content"
    },
    {
        question: "when was javascript invented",
        choices: ["1999", "1995"],
        CorrectAnswer: "1995"
    }
];

questions.sort(() => Math.random() - 0.5);
