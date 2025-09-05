const gameBoard = Array(9).fill(null);
let currentPlayer = "X";

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

    // Place move in array + UI
    gameBoard[position] = currentPlayer;
    cells[position].textContent = currentPlayer;

    // Check winner
    const result = checkWinner();
    if (result) {
      if (result.winner === "X" || result.winner === "O") {
        statusDisplay.textContent = `Game Over! Winner is ${result.winner}`;
        result.pattern.forEach(i => cells[i].style.backgroundColor = "lightgreen");
      } else if (result.winner === "Tie") {
        statusDisplay.textContent = "Game Over! It's a tie.";
      }
      // Stop further clicks only now
      cells.forEach(c => c.removeEventListener("click", handleClick));
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = "Next turn: Player " + currentPlayer;
  }

  function handleClick(e) {
    const position = Array.from(cells).indexOf(e.target);
    makeMove(position);
  }

  function resetGame() {
    for (let i = 0; i < gameBoard.length; i++) gameBoard[i] = null;
    currentPlayer = "X";
    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.backgroundColor = "";
      cell.addEventListener("click", handleClick);
    });
    statusDisplay.textContent = "Game reset. Player X starts.";
  }

  // Attach listeners at start
  cells.forEach(cell => cell.addEventListener("click", handleClick));

  // Expose resetGame
  window.resetGame = resetGame;

  statusDisplay.textContent = "Player X starts.";
}

ticTacToe();
