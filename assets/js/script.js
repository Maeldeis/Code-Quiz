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

// my variables
var score = 0;
var questionI = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper")
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 5;
var ulCreate = document.createElement ("ul");

//button timer trigger
timer.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time up";
            }
        }, 1000);
    }
    render(questionI);
});


// submitting scores
var storedScores = localStorage.getItem("scores");
var scores = storedScores ? JSON.parse(storedScores):[];
var playerI = initials.value;
var playerData = { 
    initials: playerI,
    score:score,
};
scores.push(playerData);
localStorage.setItem("scores",JSON.stringify(scores));
window.location.href = "highscores.html";
