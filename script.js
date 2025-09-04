   const gameBoard = Array(9).fill(null);   

    function ticTacToe(){
        const winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [6,4,2], [0,4,8]];
        let currentPlayer = "X";

        function printBoard(){

            console.log(`
            ${gameBoard[0] || '-'} | ${gameBoard[1] || '-'} | ${gameBoard[2] || '-'}
            ---------
            ${gameBoard[3] || '-'} | ${gameBoard[4] || '-'} | ${gameBoard[5] || '-'}
            ---------
            ${gameBoard[6] || '-'} | ${gameBoard[7] || '-'} | ${gameBoard[8] || '-'}`)
        }
        printBoard();

        function checkWinner(winningPatterns){
            for(const pattern of winningPatterns){
                const a = pattern[0];
                const b = pattern[1];
                const c = pattern[2];

                if(gameBoard[a] === null){
                    continue;
                }

                if(gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
                    return gameBoard[a];
                }
            }

            let isDraw = true;
            for(let i = 0; i < gameBoard.length; i++){
                if(gameBoard[i] === null){
                    isDraw = false;
                    break;
                }
            }
            if(isDraw === true){
                return "It is a Tie"
            }
            return null;
        }

        function makeMove(position){
            if(typeof position !== "number" || position < 0 || position > 8){
                console.log("Enter a valid position between 0-8 :");
                return;
            }

            if(gameBoard[position]!== null){
                console.log("Index was occupied........");
                return;
            }

            gameBoard[position] = currentPlayer;
            printBoard();

            let result = checkWinner();
            if(result === 'X' || result === 'O'){
                console.log(`GameOver! Winner is ${result}`);
                return;
            } else if(result === "It is a Tie"){
                console.log("It's a tie")
                return;
            }
        }

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
        console.log("Next turn: Player " + currentPlayer);
        window.makeMove = makeMove;
    }

    ticTacToe();