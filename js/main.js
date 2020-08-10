// /*----- constants -----*/
maxMoves = 42;
// winningCombos =

// /*----- app's state (variables) -----*/
let columns = {
  c0: [35, 28, 21, 14, 7, 0],
  c1: [36, 29, 22, 15, 8, 1],
  c2: [37, 30, 23, 16, 9, 2],
  c3: [38, 31, 24, 17, 10, 3],
  c4: [39, 32, 25, 18, 11, 4],
  c5: [40, 33, 26, 19, 12, 5],
  c6: [41, 34, 27, 20, 13, 6],
};
let board;
let turn;

// /*----- cached element references -----*/
let circles = document.querySelectorAll(".gameCircle");

// /*----- event listeners -----*/
document.querySelector("#replay").addEventListener("click", initialize);
document.querySelector(".btns").addEventListener("click", handleClick);

/*----- functions -----*/

//initialize game:
function initialize() {
  board = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  turn = true;
  render();
}

function render() {
  board.forEach(function (move, idx) {
    if (move === true) {
      circles[idx].style.backgroundColor = "red";
    } else if (move === false) {
      circles[idx].style.backgroundColor = "yellow";
    } else {
      circles[idx].style.backgroundColor = "white";
    }
  });
}

function handleClick(e) {
  let idx = parseInt(e.target.id.replace("dr", ""));
  let newCurrentColumn = columns[`c${idx}`];
  for (let i = 0; i < newCurrentColumn.length; i++) {
    if (board[newCurrentColumn[i]] === null) {
      board[newCurrentColumn[i]] = turn;
      turn = !turn;
      render();
      break;
    }
  }
}

function winningMessage() {
  document.getElementById("msg").textContent = `${
    turn === true ? "Red" : "Yellow"
  } Player wins!`;
}

initialize();

// have players alternate turns to try to be the first one to align 4 pieces in a row
// when a user clicks a drop button, drop the piece to the bottom-most piece of the column
// - this means that we'll have to start from the bottom circle, and then work our way up to see if each circle's value
// or if it's true (red) or false (yellow)
// after every click, check to see if either red pieces/yellow pieces match winning combo, or if maxMoves has been reached.
// If neither condition is met, continue playing.
// If there is, display winning message.
// display the red/yellow piece on the board
// Have the replay button initialize the board.
