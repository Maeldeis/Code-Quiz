

// variables from HTML
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
var scoresLink = document.querySelector("highscores");
var currentQuestionIndex = 0;
var timerInterval;
var feedbackContainer = document.getElementById("feedback");
var timeLeft = 60;

// Event listeners for starting and submitting
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", storeScore);

// Functions
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

    var questionTitleEl = document.getElementById("questionTitleEl");
    var choicesEl = document.getElementById("choicesEl");

    questionTitleEl.textContent = "Question: " + questionText;
    choicesEl.innerHTML = "";

    for (var i = 0; i < choices.length; i++) {
        var buttonHTML = `<button>${choices[i]}</button>`;
        choicesEl.insertAdjacentHTML('beforeend', buttonHTML);
    }

    var choiceButtons = document.querySelectorAll("#choicesEl button");
    choiceButtons.forEach(function (button) {
        button.addEventListener("click", checkAnswer);
    });
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
    
