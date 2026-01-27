let gameBoard = (function() {
    const indexMap = {
        11: 0, 12: 1, 13: 2,
        21: 3, 22: 4, 23: 5,
        31: 6, 32: 7, 33: 8
    };
    let board = ['', '', '', '', '', '', '', '', '']
    let play = (value, symbol) => {board[indexMap[value]] = symbol};
    let get = (value) => board[indexMap[value]];
    let getBoardArray = () => Array.from(board);

    return {play, get, getBoardArray}
})();


const player1 = (function () {
    const play = (value) => {
        gameBoard.play(value, 'X');
        gameState.checkEnd();

        return gameBoard.getBoardArray();
    };
    
    return { play }
})();

const player2 = (function () {
    const play = (value) => {
        gameBoard.play(value, 'O');
        gameState.checkEnd();
        return gameBoard.getBoardArray();
    };

    return { play }
})();


let gameState = (function(){
    // check Win condition
    // check Tie condition
    let checkEnd = () => {
        currentBoard = gameBoard.getBoardArray();
        // Tie
        if (!currentBoard.includes('')){
            console.log('Game is tied')
        } 
        // check win by row
        else if (checkRowWin('X')) {
            console.log('Player 1 wins')
        } 
        else if (checkRowWin('O')) {
            console.log('Player 2 wins')
        } 
        // check win by col
        else if (checkColWin('X')) {
            console.log('Player 1 wins')
        }
        else if (checkColWin('O')) {
            console.log('Player 2 wins')
        } 
        // check win by diag
        else if (checkDiagWin('X')) {
            console.log('Player 1 wins')
        }
        else if (checkDiagWin('O')) {
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
        if (gameBoard.get(value) === ''){
            
            return player1.play(value);
        } else {
            console.log('Not valid move');
        }
    };
    let p2Play = (value) => {
        if (gameBoard.get(value) === '') {
            checkEnd();
            return player2.play(value);
        } else {
            console.log('Not valid move');
        }
    };
    return {p1Play, p2Play, checkEnd}
})();
