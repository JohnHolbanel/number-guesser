// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessLeft = 3;

// UI elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e){
  if(e.target.className === "play-again"){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function(){
  let guess = parseInt(guessInput.value);
  
  // Validate number
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if winning number
  if(guess === winningNum){
    //Game over - win
    gameOver(true, `${winningNum} is correct!, YOU WIN!`);

  } else{
    // Wrong number
    guessLeft -= 1;
    if(guessLeft === 0){
      // Game over - lost
      gameOver(false, `Game over, you lost. Correct number was ${winningNum}!`);
    } else{
      // Game continues, answer wrong
      // Clear input
      guessInput.value = null;
      // Set message
      setMessage(`Incorrect number! You have ${guessLeft} guesses left!`, "red");
    }
  }
})

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = "green" : color = "red";
  // Disable input
  guessInput.disabled = true;
  // Border green
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play again?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
  }

// Get random num
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}