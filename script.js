let gameBoard = (function() {
    const indexMap = {
        11: 0, 12: 1, 13: 2,
        21: 3, 22: 4, 23: 5,
        31: 6, 32: 7, 33: 8
    };

    const indexReverseMap = {};

    for (const key in indexMap) {
        indexReverseMap[indexMap[key]] = key;
    }


    let board = ['', '', '', '', '', '', '', '', ''];
    let play = (value, symbol) => {board[indexMap[value]] = symbol};
    let get = (value) => board[indexMap[value]];
    let getBoardArray = () => Array.from(board);
    let getIndexMap = () => indexMap;
    let getIndexReverseMap = () => indexReverseMap;
    let reset = () => { board = ['', '', '', '', '', '', '', '', '']; };


    return {play, get, getBoardArray, getIndexMap, getIndexReverseMap, reset}
})();


const player1 = (function () {
    const play = (value) => {
        gameBoard.play(value, 'X');
        gameDisplay.displayRender();    
        gameState.checkEnd();

        return gameBoard.getBoardArray();
    };
    
    return { play }
})();

const player2 = (function () {
    const play = (value) => {
        gameBoard.play(value, 'O');
        gameDisplay.displayRender();
        gameState.checkEnd();
        return gameBoard.getBoardArray();
    };

    return { play }
})();


let gameState = (function(){
    let player1Name = 'Player 1';
    let player2Name = 'Player 2';
    let gamePlayable = true;

    let turn = 1;
    // check Win condition
    // check Tie condition
    let checkEnd = () => {
        currentBoard = gameBoard.getBoardArray();
        // Tie
        if (!currentBoard.includes('')){
            gameDisplay.gameEndTieDisplay('t');
            gamePlayable = false;
            console.log('Game is tied')
        } 
        // check win by row
        else if (checkRowWin('X')) {
            gameDisplay.gameEndTieDisplay('1');
            gamePlayable = false;
            console.log('Player 1 wins')
        } 
        else if (checkRowWin('O')) {
            gameDisplay.gameEndTieDisplay('2');
            gamePlayable = false;
            console.log('Player 2 wins')
        } 
        // check win by col
        else if (checkColWin('X')) {
            gameDisplay.gameEndTieDisplay('1');
            gamePlayable = false;
            console.log('Player 1 wins')
        }
        else if (checkColWin('O')) {
            gameDisplay.gameEndTieDisplay('2');
            gamePlayable = false;
            console.log('Player 2 wins')
        } 
        // check win by diag
        else if (checkDiagWin('X')) {
            gameDisplay.gameEndTieDisplay('1');
            gamePlayable = false;
            console.log('Player 1 wins')
        }
        else if (checkDiagWin('O')) {
            gameDisplay.gameEndTieDisplay('2');
            gamePlayable = false;
            console.log('Player 2 wins')
        } 
    };

    // check row wins
    let checkRowWin = (symbol) => {
        return (
            (currentBoard[0] === symbol && currentBoard[1] === symbol && currentBoard[2] === symbol) ||
            (currentBoard[3] === symbol && currentBoard[4] === symbol && currentBoard[5] === symbol) ||
            (currentBoard[6] === symbol && currentBoard[7] === symbol && currentBoard[8] === symbol)
        );
    };

    // check col wins
    let checkColWin = (symbol) => {
        return (
            (currentBoard[0] === symbol && currentBoard[3] === symbol && currentBoard[6] === symbol) ||
            (currentBoard[1] === symbol && currentBoard[4] === symbol && currentBoard[7] === symbol) ||
            (currentBoard[2] === symbol && currentBoard[5] === symbol && currentBoard[8] === symbol)
        );
    };

    // check diagonal wins
    let checkDiagWin = (symbol) => {
        return (
            (currentBoard[0] === symbol && currentBoard[4] === symbol && currentBoard[8] === symbol) ||
            (currentBoard[2] === symbol && currentBoard[4] === symbol && currentBoard[6] === symbol)
        );
    };

    // check valid move
    let p1Play = (value) => {
        if (gameBoard.get(value) === '' && turn === 1){
            turn = 2;
            checkEnd();
            gameDisplay.updateCurrentStatus();
            return player1.play(value);
        } else if (turn === 2) {
            console.log("Currently Player 2's turn")
        } else {
            console.log('Not valid move');
        }
    };
    let p2Play = (value) => {
        if (gameBoard.get(value) === '' && turn === 2) {
            turn = 1;
            checkEnd();
            gameDisplay.updateCurrentStatus();
            return player2.play(value);
        } 
        else if (turn === 1){
            console.log("Currently Player 1's turn")
        } else {
            console.log('Not valid move');
        }
    };

    let play = (value) => {
        if (gamePlayable){
            if (turn === 1) {
                p1Play(value);
            } else {
                p2Play(value);
            }
        }
    };

    let resetGame = () => {
            gameBoard.reset();
            player1Name = 'Player 1';
            player2Name = 'Player 2';
            gamePlayable = true;
            turn = 1;
            gameDisplay.displayRender();
            gameDisplay.updateCurrentStatus();
            console.log(gameBoard.getBoardArray());
    }

    let getTurn = () => turn;
    return {p1Play, p2Play, checkEnd, play, player1Name, player2Name, resetGame, getTurn}
})();

// handles display/DOM logic
let gameDisplay = (function(){
    let indexMap = gameBoard.getIndexMap();
    let indexReverseMap = gameBoard.getIndexReverseMap();
    const currentStatusDisplay = document.querySelector('.currentStatus')

    // setup reference to display
    const displayRef = {};
    for (const key in indexMap){
        displayRef[key] = document.querySelector(`.d${key}`);
    }


    // render the contents of the gameboard array to the webpage 
    let displayRender = () => {
        // Update gameboard
        const currentBoardState = gameBoard.getBoardArray();
        for (let i = 0; i < 9; i++){
            const cellValue = currentBoardState[i];
            const cellUpdate = document.createElement('div');
            cellUpdate.classList.add('cell-info');
            cellUpdate.textContent = cellValue;
            // add to display
            displayRef[indexReverseMap[i]].innerHTML = '';
            displayRef[indexReverseMap[i]].appendChild(cellUpdate);
        }
    };

    let updateCurrentStatus = () => {
        if (gameState.getTurn() == 2){
            currentStatusDisplay.textContent = `${gameState.player2Name}'s Turn`;
        } else if (gameState.getTurn() == 1) {
            currentStatusDisplay.textContent = `${gameState.player1Name}'s Turn`;
        }
    }

    let getDisplayRef = () => displayRef;

    let gameEndTieDisplay = (gameEndCondition) => {
        if (gameEndCondition === 't'){
            currentStatusDisplay.textContent = 'Game tied'
        } else if (gameEndCondition === '1') {
            currentStatusDisplay.textContent = `${gameState.player1Name} wins`;
        } else if (gameEndCondition === '2'){
            currentStatusDisplay.textContent = `${gameState.player2Name} wins`;
        }
        
    }
    

    return { displayRender, updateCurrentStatus, getDisplayRef, gameEndTieDisplay}

})();

let gameInput = (function (){

    // touch control
    const indexMap = gameBoard.getIndexMap();
    const displayRef = gameDisplay.getDisplayRef();

    for (const value in indexMap){
        console.log(`value is ${value}`)
        console.log(displayRef[value]);
        
        displayToAdd = displayRef[value];

        displayToAdd.addEventListener('click', function () {
            gameState.play(value)
        })
    }

    // Reset button
    const resetBtn = document.querySelector('.restartBtn');
    resetBtn.addEventListener('click', function () {
        gameState.resetGame()});

    // name form
    const nameForm = document.querySelector("#inputNames");
    const submitButton = document.querySelector("form .submit")

    nameForm.addEventListener("submit", function (e) {
        gameState.player1Name = form.p1Name.value;
        gameState.player2Name = form.p2Name.value;
        form.reset();
    })



})();