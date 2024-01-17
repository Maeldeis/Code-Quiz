// Quiz state
var score = 0;
var currentQuestionIndex = 0;
var timerInterval;
var timeLeft = 30;

// DOM elements
var startScreen = document.getElementById("start-screen");
var quizContainer = document.getElementById("questions");
var startButton = document.getElementById("start");
var questionTitle = document.getElementById("question-title");
var choicesContainer = document.getElementById("choices");
var timerDisplay = document.getElementById("time");
var feedbackContainer = document.getElementById("feedback");
var scoresLink = document.querySelector(".scores a");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var clearScoresButton = document.getElementById("clearScores");
var goBackButton = document.getElementById("goBack");

// Event listeners
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

// Functions
function shuffleQuestions() {
  questions.sort(function () {
    return Math.random() - 0.5;
  });
}

function showScreen(show, hide1, hide2) {
  show.classList.remove("hide");
  hide1.classList.add("hide");
  hide2.classList.add("hide");
}

function startQuiz() {
  showScreen(quizContainer, startScreen, scoresLink);
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
    var buttonHTML = "<button>" + choices[i] + "</button>";
    choicesContainer.insertAdjacentHTML('beforeend', buttonHTML);
  }

  var choiceButtons = document.querySelectorAll("#choices button");
  choiceButtons.forEach(function (button) {
    button.addEventListener("click", checkAnswer);
  });
}

function showFeedback(message, className) {
  feedbackContainer.textContent = message;
  feedbackContainer.className = "feedback " + className;

  setTimeout(function () {
    feedbackContainer.textContent = "";
    feedbackContainer.className = "feedback hide";
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
    showFeedback("Yep!", "correct");
    playSound('./assets/sfx/correct.wav');
  } else {
    timeLeft -= 10;
    showFeedback("Nope!", "wrong");
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
  showScreen(endScreen, quizContainer, startScreen);
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

    window.location.href = "highscores.html";
  }
}

function displayHighscores() {
  var highscoresList = document.getElementById("highscores");

  if (highscoresList) {
    highscoresList.innerHTML = "";

    highscores.forEach(function (score, index) {
      var li = document.createElement("li");
      console.log(score);

      if (score.initials) {
        li.textContent = score.initials + ": Score - " + score.score;
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

// Initialize highscores on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  displayHighscores();
});

scoresLink.addEventListener("click", function () {
  startScreen.classList.add("hide");
  quizContainer.classList.add("hide");
  endScreen.classList.add("hide");
  scoresLink.classList.remove("hide");
  showHighscores();
});
