const gameBoard = ["","","","","","","","",""]

function ticTacToe(){
    function choosingOption(){
        const keys = ['x','o'];
        let result = ''

        for (let i = 0; i < 9; i++){
            result += keys[i % keys.length]
        }

        console.log(result);
        
    }
    choosingOption();
}

ticTacToe();