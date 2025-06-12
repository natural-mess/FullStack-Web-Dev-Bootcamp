var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
//   console.log(gamePattern);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  //   console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //   console.log(userClickedPattern.length - 1);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", function () {
  if (!started) {
    started = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    // console.log("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
}
