
var questions = [
    {
        question:"what",
        choices:["x","y"],
        answer:"x"
    },
    {
        question:"what2",
        choices:["x","y"],
        answer:"x"
    },
    {
        question:"what3",
        choices:["x","y"],
        answer:"x"
    },
]

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
//variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");  
 
//event listener clear
clear.addEventListener("click", function () {
    localStorage.clear();
    highScore.innerHTML= "";
});

// inputs local stroage if loop
var allScores = localStorage.getItem("allScores");
allScores=localStorage.getItem("allScores");
allScores=JSON.parse(allScores)
if (allScores !==null) {
    for (let i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " "+allScores[i].score;
        highScore.appendChild(createLi);
         }
        }
// event listener move to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");