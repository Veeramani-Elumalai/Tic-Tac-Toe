const gameBoard = Array(9).fill(null);
let currentPlayer = "X";

function ticTacToe() {
  const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [2,4,6], [0,4,8]
  ];

  function printBoard() {
    console.log(`
 ${gameBoard[0] || '-'} | ${gameBoard[1] || '-'} | ${gameBoard[2] || '-'}
---+---+---
 ${gameBoard[3] || '-'} | ${gameBoard[4] || '-'} | ${gameBoard[5] || '-'}
---+---+---
 ${gameBoard[6] || '-'} | ${gameBoard[7] || '-'} | ${gameBoard[8] || '-'}
    `);
  }

  // print initial empty board
  printBoard();

  function checkWinner() {
    for (const pattern of winningPatterns) {
      const a = pattern[0], b = pattern[1], c = pattern[2];

      // if starting cell is empty, skip this pattern
      if (gameBoard[a] === null) continue;

      // if all three cells are equal (X or O), return the winner
      if (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    // check draw
    let isDraw = true;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === null) { isDraw = false; break; }
    }
    if (isDraw) return "It is a Tie";

    return null; // game still going
  }

  // makeMove now contains all game flow and switches the player inside
  function makeMove(position) {
    // Step 1: valid number and range
    if (typeof position !== "number" || position < 0 || position > 8) {
      console.log("Enter a valid position between 0 and 8.");
      return;
    }

    // Step 2: is the cell free?
    if (gameBoard[position] !== null) {
      console.log("That spot is already filled. Choose another.");
      return;
    }

    // Step 3: place mark
    gameBoard[position] = currentPlayer;
    printBoard();

    // Step 4: check winner or tie
    const result = checkWinner();
    if (result === "X" || result === "O") {
      console.log(`Game Over! Winner is ${result}`);
      // disable further moves until reset
      window.makeMove = function() { console.log("Game over. Call resetGame() to start again."); };
      return;
    } else if (result === "It is a Tie") {
      console.log("Game Over! It's a tie.");
      window.makeMove = function() { console.log("Game over. Call resetGame() to start again."); };
      return;
    }

    // Step 5: switch player (simple if/else for clarity)
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    console.log("Next turn: Player " + currentPlayer);
  }

  // small helper to reset the board and restore makeMove
  function resetGame() {
    for (let i = 0; i < gameBoard.length; i++) gameBoard[i] = null;
    currentPlayer = "X";
    printBoard();
    window.makeMove = makeMove;
    console.log("Game reset. Next turn: Player " + currentPlayer);
  }

  // expose the functions so you can call them from the console
  window.makeMove = makeMove;
  window.resetGame = resetGame;
}

ticTacToe();
