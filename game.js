var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

//When the user clicks on a button
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// When the user pressed a keyboard key for the first time
$(document).keydown(function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    level++;
    userClickedPattern = [];

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {

    switch (name) {
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        wrongAnswer();
        startOver();
    }
}

function wrongAnswer() {
    //Play audio 
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    //Add the class to the body
    $("body").addClass("game-over");
    //Remove the class from the body.
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200)

    //Change h1 content
    $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}