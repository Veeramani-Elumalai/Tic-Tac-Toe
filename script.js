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

    printBoard();

    function checkWinner() {
        for (const [a, b, c] of winningPatterns) {
            if (gameBoard[a] === null) continue;

            if (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];    // "X" or "O"
            }
        }

        // check draw
        if (gameBoard.every(cell => cell !== null)) {
            return "Tie";
        }
        return null;
    }

  // makeMove now contains all game flow and switches the player inside
    function makeMove(position) {
        if (typeof position !== "number" || position < 0 || position > 8) {
        console.log("Enter a valid position between 0 and 8.");
        return;
        }

        if (gameBoard[position] !== null) {
        console.log("That spot is already filled. Choose another.");
        return;
        }

        gameBoard[position] = currentPlayer;
        printBoard();

        currentPlayer === "X"? currentPlayer = "O":currentPlayer="X";
        console.log("Next turn: Player " + currentPlayer);

        //check winner or tie
        const result = checkWinner();
        if (result === "X" || result === "O") {
            console.log(`Game Over! Winner is ${result}`);
            window.makeMove = function() { console.log("Game over. Call resetGame() to start again."); };
            return;
        } else if (result === "Tie") {
            console.log("Game Over! It's a tie.");
            window.makeMove = function() { console.log("Game over. Call resetGame() to start again."); };
            return;
        }
    }

  // reset the board and restore makeMove
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
