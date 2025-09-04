   const gameBoard = Array(9).fill(null);   

    function ticTacToe(){
        const winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [6,4,2], [0,4,8]];

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
        }
    }

    ticTacToe();