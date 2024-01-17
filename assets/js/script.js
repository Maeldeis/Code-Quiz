var score = 0;
var currentQuestionIndex = 0;
var timerInterval;
var timeLeft = 60;

var startScreen = document.getElementById("start-screen");
var quizContainer = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesContainer = document.getElementById("choices");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var timerDisplay = document.getElementById("time");
var startButton = document.getElementById("start");
var feedbackContainer = document.getElementById("feedback");
var scoresLink = document.querySelector(".scores a"); 
var goBackButton = document.getElementById("goBack");
var clearScoresButton = document.getElementById("clearScores");

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", storeScore);
scoresLink.addEventListener("click", showHighscores);
goBackButton.addEventListener("click", function () {
    startScreen.classList.remove("hide");
    scoresLink.classList.remove("hide");
    endScreen.classList.add("hide");
});
clearScoresButton.addEventListener("click", function () {
    localStorage.removeItem("highScores");
    showHighscores();
});

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionText = currentQuestion.question;
    var choices = currentQuestion.choices;

    questionTitle.textContent = "Question: " + questionText;
    choicesContainer.innerHTML = "";

    for (var i = 0; i < choices.length; i++) {
        var buttonHTML = `<button>${choices[i]}</button>`;
        choicesContainer.insertAdjacentHTML('beforeend', buttonHTML);
    }

    var choiceButtons = document.querySelectorAll("#choices button");
    choiceButtons.forEach(function (button) {
        button.addEventListener("click", checkAnswer);
    });
}

function showFeedback(message, className) {
    var feedbackElement = document.createElement("div");
    feedbackElement.className = "feedback " + className;
    feedbackElement.textContent = message;

    feedbackContainer.innerHTML = "";
    feedbackContainer.appendChild(feedbackElement);

    setTimeout(function () {
        feedbackContainer.innerHTML = "";
    }, 1000);
}

function playSound(source) {
    var audio = new Audio(source);
    audio.play();
}

function checkAnswer(event) {
    var selectedAnswerText = event.target.textContent;
    var currentQuestion = questions[currentQuestionIndex];

    var selectedAnswer = selectedAnswerText;
    var correctAnswer = currentQuestion.correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
        showFeedback("Correct!", "correct");
        playSound('./assets/sfx/correct.wav'); 
    } else {
        timeLeft -= 10;
        showFeedback("Wrong!", "wrong");
        playSound('./assets/sfx/incorrect.wav'); 
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = "Final Score: " + score;
}

function storeScore() {
    var userInitials = initialsInput.value.trim();

    if (userInitials !== "") {
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        var newScore = {
            initials: userInitials,
            score: score
        };

        highscores.push(newScore);
        highscores.sort(function (a, b) {
            return b.score - a.score;
        });

        localStorage.setItem("highscores", JSON.stringify(highscores));
        showHighscores();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    function displayHighscores() {
        const highscoresList = document.getElementById("highscores");

        if (highscoresList) {
            highscoresList.innerHTML = "";

            highscores.forEach((score, index) => {
                const li = document.createElement("li");
                console.log(score);

                if (score.initials) {
                    li.textContent = `${score.initials}: Score - ${score.score}`;
                    highscoresList.appendChild(li);
                }
            });
        }
    }

    function clearHighscores() {
        highscores = [];
        localStorage.removeItem("highscores");
        displayHighscores();
    }

    const clearButton = document.getElementById("clear");
    if (clearButton) {
        clearButton.addEventListener("click", clearHighscores);
    }

    displayHighscores();
});

scoresLink.addEventListener("click", function () {
    startScreen.classList.add("hide");
    quizContainer.classList.add("hide");
    endScreen.classList.add("hide");
    scoresLink.classList.remove("hide");
    showHighscores();
});
