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
        answer:"y"
// my variables from html
var score = 0;
var questionI = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 5;
const correctSound = new Audio("./assets/sfx/correct.wav");
const wrongSound = new Audio ("./assets/sfx/incorrect.wav");
var startEl = document.querySelector("#start");
var startScreenEl=document.querySelector("#start-screen");
var endScreenEl = document.querySelector("#end-screen");
var finalScores = document.querySelector("#final-score");
var feedbackEl = document.querySelector("#feedback");
var submit = document.querySelector("#submit");
var initialsEl=document.querySelector("#initials");