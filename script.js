let gameBoard = Array(9).fill(null);
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;

document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.querySelector('#dialogContainer');
  dialog.showModal();
});

function displayPlayers() {
  updateScoreCard();
  document.querySelector('#dialogContainer').close();
}

function updateScoreCard() {
  const playerX = document.querySelector('#playerX').value || "Player X";
  const playerO = document.querySelector('#playerO').value || "Player O";

  document.querySelector('#X').textContent = `${playerX} is X : ${scoreX}`;
  document.querySelector('#O').textContent = `${playerO} is O : ${scoreO}`;
}

function ticTacToe() {
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.querySelector('.result');

  const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function checkWinner() {
    for (const [a, b, c] of winningPatterns) {
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return { winner: gameBoard[a], pattern: [a, b, c] };
      }
    }
    if (gameBoard.every(cell => cell !== null)) {
      return { winner: "Tie" };
    }
    return null;
  }

  function makeMove(position) {
    if (gameBoard[position] !== null) {
      statusDisplay.textContent = "That spot is already filled.";
      return;
    }

    gameBoard[position] = currentPlayer;
    cells[position].textContent = currentPlayer;

    const result = checkWinner();

    if (result) {
      if (result.winner === "X") {
        scoreX++;
        updateScoreCard();
        statusDisplay.textContent = `Round Winner: ${result.winner}`;
        result.pattern.forEach(i => cells[i].style.backgroundColor = "lightgreen");
      } else if (result.winner === "O") {
        scoreO++;
        updateScoreCard();
        statusDisplay.textContent = `Round Winner: ${result.winner}`;
        result.pattern.forEach(i => cells[i].style.backgroundColor = "lightgreen");
      } else if (result.winner === "Tie") {
        statusDisplay.textContent = "It's a tie!";
      }

      // Best of 3 → first to 2 wins
      if (scoreX === 2 || scoreO === 2) {
        const finalWinner = scoreX === 2 ? "X" : "O";
        statusDisplay.textContent = `🏆 Final Winner is Player ${finalWinner}!`;
        cells.forEach(c => c.removeEventListener("click", handleClick));
      } else {
        // prepare for next round
        setTimeout(resetBoard, 1500); // auto reset board after 1.5s
      }
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = "Next turn: Player " + currentPlayer;
  }

  function handleClick(e) {
    const position = Array.from(cells).indexOf(e.target);
    makeMove(position);
  }

  // clears only the board, keeps scores
  function resetBoard() {
    gameBoard = Array(9).fill(null);
    currentPlayer = "X";
    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.backgroundColor = "";
      cell.addEventListener("click", handleClick);
    });
    statusDisplay.textContent = "New Round! Player X starts.";
  }

  // full reset (board + scores)
  function resetGame() {
    scoreX = 0;
    scoreO = 0;
    updateScoreCard();
    resetBoard();
    statusDisplay.textContent = "Game reset. Player X starts.";
  }

  cells.forEach(cell => cell.addEventListener("click", handleClick));

  const reset_btn = document.querySelector('.resetBtn');
  if (reset_btn) reset_btn.addEventListener("click", resetGame);

  updateScoreCard();
  statusDisplay.textContent = "Player X starts.";
}

ticTacToe();
