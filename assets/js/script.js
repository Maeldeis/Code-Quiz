// Array var object
var questions = [
    {
        question: "what",
        choices: ["x", "y"],
        answer: "x"
    },
    {
        question: "what2",
        choices: ["x", "y"],
        answer: "y"
    },
    {
        question: "what3",
        choices: ["x", "y"],
        answer: "y"
    }
];

// variables from HTML
var score = 0;
var startScreen = document.getElementById("start-screen");
var quizContainer = document.getElementById("questions");
var questionIndex = 0;
var choicesContainer = document.getElementById("choices");
var currentTime = document.querySelector("#currentTime");
var timerDisplay = document.querySelector("#startTime"); /
var questionsDiv = document.querySelector("#questionsDiv");
var endScreen = document.querySelector("#end-screen"); 
var finalScore = document.querySelector("#final-score"); 
var startButton = document.querySelector("#start"); 
var submitButton = document.querySelector("#submit"); 
var startScreenEl = document.querySelector("#start-screen");
var currentQuestionIndex = 0;
var timerInterval;
var feedbackContainer = document.getElementById("feedback");
var timeLeft = 60; // Assuming you want to start with 60 seconds

// Event listeners for starting and submitting
startButton.addEventListener("click", beginQuiz);
submitButton.addEventListener("click", storeScore);

// Functions
function beginQuiz() {
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    var currentQuestion = questions[questionIndex];
    var questionText = currentQuestion.question;
    var choices = currentQuestion.choices;

    var questionTitleEl = document.getElementById("questionTitleEl");
    var choicesEl = document.getElementById("choicesEl");

    questionTitleEl.textContent = "Question: " + questionText;
    choicesEl.innerHTML = "";

    for (var i = 0; i < choices.length; i++) {
        const buttonHTML = `<button>${choices[i]}</button>`;
        choicesEl.insertAdjacentHTML('beforeend', buttonHTML);
    }
}

function checkAnswer(event) {
    const selectedAnswerText = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.choices) {
        const selectedAnswer = selectedAnswerText;
        const correctAnswer = currentQuestion.answer;

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
    
