var score = 0;
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
var scoresLink = document.getElementById("scoresLink");
var currentQuestionIndex = 0;
var timerInterval;
var timeLeft = 60;

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", storeScore);
scoresLink.addEventListener("click", showHighScores);

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

function checkAnswer(event) {
    var selectedAnswerText = event.target.textContent;
    var currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.choices) {
        var selectedAnswer = selectedAnswerText;
        var correctAnswer = currentQuestion.answer;

        if (selectedAnswer === correctAnswer) {
            score++;
            showFeedback("Correct!", "correct");
        } else {
            timeLeft -= 10;
            showFeedback("Wrong!", "wrong");
        }
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
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var newScore = {
            initials: userInitials,
            score: score
        };

        highScores.push(newScore);
        highScores.sort(function (a, b) {
            return b.score - a.score;
        });

        localStorage.setItem("highScores", JSON.stringify(highScores));
        showHighScores();
    }
}

function showHighScores() {
    endScreen.classList.add("hide");
    scoresLink.classList.remove("hide");

    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    for (var i = 0; i < highScores.length; i++) {
        var scoreEntry = document.createElement("li");
        scoreEntry.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoresList.appendChild(scoreEntry);
    }
}

scoresLink.addEventListener("click", function () {
    startScreen.classList.add("hide");
    quizContainer.classList.add("hide");
    endScreen.classList.add("hide");
    scoresLink.classList.remove("hide");
    showHighScores();
});

var goBackButton = document.getElementById("goBack");
goBackButton.addEventListener("click", function () {
    startScreen.classList.remove("hide");
    scoresLink.classList.remove("hide");
    endScreen.classList.add("hide");
});

var clearScoresButton = document.getElementById("clearScores");
clearScoresButton.addEventListener("click", function () {
    localStorage.removeItem("highScores");
    showHighScores();
});
