// Array var object

var questions = [
    {
        question:"what",
        choices:["x","y"],
        answer:"x"
    },
    {
        question:"what2",
        choices:["x","y"],
        answer:"y"
    },
    {
        question:"what3",
        choices:["x","y"],
        answer:"x"
    },
]

var score = 0;
var questionI = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
