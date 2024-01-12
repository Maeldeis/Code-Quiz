// Declared variables
var highScore = document.querySelector (#highScore");
var clear = document.querySelector (#clear");
var goBack = document.querySelector(#goBack);  
 
// Event listener to clear scores 

// Retreives local stroage 

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Event listener to move to index page
