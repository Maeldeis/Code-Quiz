document.addEventListener("DOMContentLoaded", function () {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    function displayHighscores() {
      var highscoresList = document.getElementById("highscores");
      if (highscoresList) {
        highscoresList.innerHTML = "";
        highscores.forEach((score, index) => {
          var li = document.createElement("li");
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
    var clearButton = document.getElementById("clear");
    if (clearButton) {
      clearButton.addEventListener("click", clearHighscores);
    }
     displayHighscores();
  });