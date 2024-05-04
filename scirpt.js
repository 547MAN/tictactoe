/* Boxes of the game */
const numb1 = document.querySelector(`.box1`);
const numb2 = document.querySelector(`.box2`);
const numb3 = document.querySelector(`.box3`);
const numb4 = document.querySelector(`.box4`);
const numb5 = document.querySelector(`.box5`);
const numb6 = document.querySelector(`.box6`);
const numb7 = document.querySelector(`.box7`);
const numb8 = document.querySelector(`.box8`);
const numb9 = document.querySelector(`.box9`);

//The game window
const tTT = document.querySelector(`.TTT`);

// game text
const winMsg = document.querySelector(`.winMsg`);
const startMsg = document.querySelector(`.startMsg`);
const replayMsg = document.querySelector(`.replayMsg`);
const drawMsg = document.querySelector(`.drawMsg`);

//Player representation
const player0 = `X`; // Red
const player1 = `O`; // Blue

//Player screen side
const leftP1 = document.querySelector(`.leftSide`);
const rightP0 = document.querySelector(`.rightSide`);

//Switcher for player 1 and 2.
let playerTurn = true;

//boolean to avoid further selection of boxes
let gameOver = false;

// The numbAll array stores DOM elements for each box button in the Tic Tac Toe game.
// This allows for easier manipulation of the buttons as a group.
let numbAll = [
  document.querySelector(`.box1`),
  document.querySelector(`.box2`),
  document.querySelector(`.box3`),
  document.querySelector(`.box4`),
  document.querySelector(`.box5`),
  document.querySelector(`.box6`),
  document.querySelector(`.box7`),
  document.querySelector(`.box8`),
  document.querySelector(`.box9`),
];

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
//Timer and its functions
const leftTimer = document.querySelector(`.leftTimer`);
const rightTimer = document.querySelector(`.rightTimer`);

let leftTimerId, rightTimerId;
let leftStartTime, rightStartTime;
// Initialize elapsed time for each player
let leftElapsed = 0;
let rightElapsed = 0;

const leftTimeOut = document.querySelector(`.leftTimeOut`);
const rightTimeOut = document.querySelector(`.rightTimeOut`);

leftTimeOut.classList.add(`hidden`);
rightTimeOut.classList.add(`hidden`);
//Time for left side, player O.
const timerForLeft = function () {
  let timePassed = Date.now() - leftStartTime + leftElapsed;
  let seconds = Math.floor(timePassed / 1000);
  let milliseconds = timePassed % 1000;
  leftTimer.textContent = `${seconds}:${milliseconds}`;

  if (timePassed >= 10000) {
    leftTimer.textContent = `10:000`;
    leftTimeOut.classList.remove(`hidden`);
    player1TurnMsg.classList.add(`hidden`);
    player0TurnMsg.classList.add(`hidden`);
    clearInterval(leftTimerId);
    gameOver = true;
    replayMsg.classList.remove(`hidden`);
  }
};
//Time for right side, player X.
const timerForRight = function () {
  let timePassed = Date.now() - rightStartTime + rightElapsed;
  let seconds = Math.floor(timePassed / 1000);
  let milliseconds = timePassed % 1000;
  rightTimer.textContent = `${seconds}:${milliseconds}`;

  if (timePassed >= 10000) {
    rightTimer.textContent = `10:000`;
    rightTimeOut.classList.remove(`hidden`);
    player1TurnMsg.classList.add(`hidden`);
    player0TurnMsg.classList.add(`hidden`);
    clearInterval(rightTimerId);
    gameOver = true;
    replayMsg.classList.remove(`hidden`);
  }
};

// Function to manage the game timers for each player's turn
const btnFunction = function () {
  // Check if it's player's turn
  if (playerTurn) {
    // If a timer is already running for the left player, clear the timer
    if (leftTimerId) {
      clearInterval(leftTimerId);
      // Update the elapsed time for the left player
      leftElapsed += Date.now() - leftStartTime; // Store elapsed time
      // Reset timerId for the left player
      leftTimerId = null;
    }
    // If there's no timer running for the right player, start a new timer
    if (!rightTimerId) {
      rightStartTime = Date.now();
      // Set the timer to call timerForRight function every 1 millisecond
      rightTimerId = setInterval(timerForRight, 1);
    }
  } else {
    // If a timer is already running for the right player, clear the timer
    if (rightTimerId) {
      clearInterval(rightTimerId);
      // Update the elapsed time for the right player
      rightElapsed += Date.now() - rightStartTime; // Store elapsed time
      // Reset timerId for the right player
      rightTimerId = null;
    }

    // If there's no timer running for the left player, start a new timer
    if (!leftTimerId) {
      leftStartTime = Date.now();
      // Set the timer to call timerForLeft function every 1 millisecond
      leftTimerId = setInterval(timerForLeft, 1);
    }
  }
};
// Function to start the timers
const startTimers = function () {
  // Start the left timer for player1
  if (!leftStartTime) leftStartTime = Date.now();
  if (!leftTimerId) leftTimerId = setInterval(timerForLeft, 1);
};

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
// Hide turn msg and timer msg
const player1TurnMsg = document.querySelector(`.turn0`);
const player0TurnMsg = document.querySelector(`.turn1`);

const player1TurnTimer = document.querySelector(`.leftTimer`);
const player0TurnTimer = document.querySelector(`.rightTimer`);

player1TurnMsg.classList.add(`hidden`);
player0TurnMsg.classList.add(`hidden`);

player1TurnTimer.classList.add(`hidden`);
player0TurnTimer.classList.add(`hidden`);
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

//Function to switch color when is players turn
const turnColor = function () {
  if (!playerTurn) {
    player0TurnTimer.classList.add(`hidden`);
    player0TurnMsg.classList.add(`hidden`);
    player1TurnMsg.classList.remove(`hidden`);
    player1TurnTimer.classList.remove(`hidden`);
    leftP1.style.background = `blue`;
    rightP0.style.background = `white`;
  } else if (playerTurn) {
    player1TurnTimer.classList.add(`hidden`);
    player1TurnMsg.classList.add(`hidden`);
    player0TurnMsg.classList.remove(`hidden`);
    player0TurnTimer.classList.remove(`hidden`);
    leftP1.style.background = `white`;
    rightP0.style.background = `red`;
  }
};
const clearTurnColor = function () {
  playerTurn = false;
  leftP1.style.background = `white`;
  rightP0.style.background = `white`;
  player0TurnMsg.classList.add(`hidden`);
  player1TurnMsg.classList.add(`hidden`);
  player0TurnTimer.classList.add(`hidden`);
  player1TurnTimer.classList.add(`hidden`);
};
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

//Function to play the game text.
startMsg.classList.remove(`hidden`);
tTT.classList.add(`hidden`);
const playGameMsg = function () {
  player1TurnTimer.classList.remove(`hidden`);
  player1TurnMsg.classList.remove(`hidden`);
  leftP1.style.background = `blue`;
  startMsg.classList.add(`hidden`);
  tTT.classList.remove(`hidden`);
  replayMsg.classList.add(`hidden`);
  startTimers();
  ticTacToeGame();
};
startMsg.addEventListener(`click`, playGameMsg);
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

//function to replay the game
const replayGame = function () {
  // Reset and stop the timers
  if (leftTimerId) {
    clearInterval(leftTimerId);
    leftTimerId = null;
  }
  if (rightTimerId) {
    clearInterval(rightTimerId);
    rightTimerId = null;
  }
  leftElapsed = 0;
  rightElapsed = 0;
  leftStartTime = null;
  rightStartTime = null;

  // Reset the displayed time
  leftTimer.textContent = "0:0";
  rightTimer.textContent = "0:0";

  // Start the timer for the first player
  leftStartTime = Date.now();
  leftTimerId = setInterval(timerForLeft, 1);

  clearTurnColor();
  turnColor();
  //This removes all the red and blue classes.
  numbAll.forEach((box) => {
    box.classList.remove("red");
    box.classList.remove("blue");
  });
  //hides the pop messages
  winMsg.classList.add(`hidden`);
  replayMsg.classList.add(`hidden`);
  player0TurnMsg.classList.add(`hidden`);
  player0TurnTimer.classList.add(`hidden`);
  rightTimeOut.classList.add(`hidden`);
  leftTimeOut.classList.add(`hidden`);
  //Resets the game state
  playerTurn = true;
  gameOver = false;
  //starts the game
  ticTacToeGame();
};
replayMsg.addEventListener(`click`, replayGame);
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
// Draw msg:
drawMsg.classList.add(`hidden`);

//funciton to draw replay
const replayDrawGame = function () {
  // Reset and stop the timers
  if (leftTimerId) {
    clearInterval(leftTimerId);
    leftTimerId = null;
  }
  if (rightTimerId) {
    clearInterval(rightTimerId);
    rightTimerId = null;
  }
  leftElapsed = 0;
  rightElapsed = 0;
  leftStartTime = null;
  rightStartTime = null;

  // Reset the displayed time
  leftTimer.textContent = "0:0";
  rightTimer.textContent = "0:0";

  // Start the timer for the first player
  leftStartTime = Date.now();
  leftTimerId = setInterval(timerForLeft, 1);

  clearTurnColor();
  turnColor();
  //This removes all the red and blue classes.
  numbAll.forEach((box) => {
    box.classList.remove("red");
    box.classList.remove("blue");
  });
  //hides the pop messages
  drawMsg.classList.add(`hidden`);
  //Resets the game state
  playerTurn = true;
  gameOver = false;
  //starts the game
  ticTacToeGame();
};

drawMsg.addEventListener(`click`, replayDrawGame);
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

// funciton to stop the game and show the player who won.
winMsg.classList.add(`hidden`);
replayMsg.classList.add(`hidden`);
const gameWinnerMsg = function () {
  // Stop the timers
  if (leftTimerId) {
    clearInterval(leftTimerId);
    leftTimerId = null;
  }
  if (rightTimerId) {
    clearInterval(rightTimerId);
    rightTimerId = null;
  }
  if (!playerTurn) {
    winMsg.textContent = `${player0} Won!`;
    winMsg.classList.remove(`hidden`);
    replayMsg.classList.remove(`hidden`);
    playerTurn = true;
  } else if (playerTurn) {
    winMsg.textContent = `${player1} Won!`;
    winMsg.classList.remove(`hidden`);
    replayMsg.classList.remove(`hidden`);
    playerTurn = false;
  }
  gameOver = true;
};
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

//The whole game in a callable function
const ticTacToeGame = function () {
  const changePlayer = function () {
    if (
      gameOver ||
      this.classList.contains("blue") ||
      this.classList.contains("red")
    ) {
      return;
    }

    if (playerTurn) {
      btnFunction();
      this.classList.add("blue");
      turnColor();

      if (
        numb1.classList.contains("blue") &&
        numb2.classList.contains("blue") &&
        numb3.classList.contains("blue")
      ) {
        gameWinnerMsg();
      } else if (
        numb1.classList.contains("blue") &&
        numb5.classList.contains("blue") &&
        numb9.classList.contains("blue")
      ) {
        gameWinnerMsg();
      } else if (
        numb3.classList.contains("blue") &&
        numb5.classList.contains("blue") &&
        numb7.classList.contains("blue")
      ) {
        gameWinnerMsg();
      } else if (
        numb1.classList.contains("blue") &&
        numb4.classList.contains("blue") &&
        numb7.classList.contains("blue")
      ) {
        gameWinnerMsg();
      } else if (
        numb2.classList.contains("blue") &&
        numb5.classList.contains("blue") &&
        numb8.classList.contains("blue")
      ) {
        gameWinnerMsg();
      } else if (
        numb3.classList.contains("blue") &&
        numb6.classList.contains("blue") &&
        numb9.classList.contains("blue")
      ) {
        gameWinnerMsg();
      } else if (
        numb4.classList.contains("blue") &&
        numb5.classList.contains("blue") &&
        numb6.classList.contains("blue")
      ) {
        gameWinnerMsg();
      } else if (
        numb7.classList.contains("blue") &&
        numb8.classList.contains("blue") &&
        numb9.classList.contains("blue")
      ) {
        gameWinnerMsg();
      }

      playerTurn = false;
    } else if (!playerTurn) {
      btnFunction();
      this.classList.add("red");
      turnColor();

      if (
        numb1.classList.contains("red") &&
        numb2.classList.contains("red") &&
        numb3.classList.contains("red")
      ) {
        gameWinnerMsg();
      } else if (
        numb1.classList.contains("red") &&
        numb5.classList.contains("red") &&
        numb9.classList.contains("red")
      ) {
        gameWinnerMsg();
      } else if (
        numb3.classList.contains("red") &&
        numb5.classList.contains("red") &&
        numb7.classList.contains("red")
      ) {
        gameWinnerMsg();
      } else if (
        numb1.classList.contains("red") &&
        numb4.classList.contains("red") &&
        numb7.classList.contains("red")
      ) {
        gameWinnerMsg();
      } else if (
        numb2.classList.contains("red") &&
        numb5.classList.contains("red") &&
        numb8.classList.contains("red")
      ) {
        gameWinnerMsg();
      } else if (
        numb3.classList.contains("red") &&
        numb6.classList.contains("red") &&
        numb9.classList.contains("red")
      ) {
        gameWinnerMsg();
      } else if (
        numb4.classList.contains("red") &&
        numb5.classList.contains("red") &&
        numb6.classList.contains("red")
      ) {
        gameWinnerMsg();
      } else if (
        numb7.classList.contains("red") &&
        numb8.classList.contains("red") &&
        numb9.classList.contains("red")
      ) {
        gameWinnerMsg();
      }
      playerTurn = true;
    }
    //Function for a draw
    const allBoxesFilled = function () {
      let boxes = [
        numb1,
        numb2,
        numb3,
        numb4,
        numb5,
        numb6,
        numb7,
        numb8,
        numb9,
      ];
      return boxes.every(
        (box) => box.classList.contains("blue") || box.classList.contains("red")
      );
    };
    // After a player makes a move
    if (!gameOver) {
      // Delay the draw check by a small amount of time
      setTimeout(() => {
        if (allBoxesFilled()) {
          // Reset and stop the timers
          if (leftTimerId) {
            clearInterval(leftTimerId);
            leftTimerId = null;
          }
          if (rightTimerId) {
            clearInterval(rightTimerId);
            rightTimerId = null;
          }
          leftElapsed = 0;
          rightElapsed = 0;
          leftStartTime = null;
          rightStartTime = null;

          btnFunction();
          drawMsg.classList.remove(`hidden`);
          console.log("replayMsg classList:", replayMsg.classList);
          gameOver = true;
        }
      }, 100); // 100 ms delay, adjust as needed
    }
  };

  /* Applies the switch */
  numbAll.forEach((box) => {
    box.addEventListener(`click`, changePlayer);
  });
};
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
