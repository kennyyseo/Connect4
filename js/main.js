// /*----- constants -----*/
winningCombos = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 7, 25, 33],
  [8, 16, 24, 32],
  [11, 7, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 2],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
];

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
  board = new Array(42).fill(null);
  document.getElementById("msg").textContent = null;
  document.querySelector(".btns").addEventListener("click", handleClick);
  turn = true;
  winner = null;
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
      if (checkWinner()) {
        playCheer();
        winner = turn;
        winningMessage();
        document
          .querySelector(".btns")
          .removeEventListener("click", handleClick);
      } else if (!board.includes(null)) {
        tieGame();
      }
      render();
      turn = !turn;
      break;
    }
  }
}

function checkWinner() {
  return winningCombos.some(function (arr) {
    return (
      board[arr[0]] !== null &&
      board[arr[0]] === board[arr[1]] &&
      board[arr[0]] === board[arr[2]] &&
      board[arr[0]] === board[arr[3]]
    );
  });
}

function winningMessage() {
  document.getElementById("msg").textContent = `${
    turn === true ? "Red" : "Yellow"
  } Player wins!`;
}

function tieGame() {
  document.getElementById("msg").textContent = `Nobody wins!`;
}

function playSnap() {
  var audio = document.createElement("audio");
  audio.src = "https://freesound.org/data/previews/399/399934_1676145-lq.mp3";
  audio.play();
}

function playCheer() {
  var audio = document.createElement("audio");
  audio.src = "https://freesound.org/data/previews/400/400590_3372256-lq.mp3";
  audio.play();
}

initialize();
