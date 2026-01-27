let gameBoard = (function() {
    const indexMap = {
        11: 0, 12: 1, 13: 2,
        21: 3, 22: 4, 23: 5,
        31: 6, 32: 7, 33: 8
    };
    let board = ['', '', '', '', '', '', '', '', '']
    let play = (value, symbol) => {board[indexMap[value]] = symbol};
    let get = (value) => board[indexMap[value]];
    let displayBoard = () => Array.from(board);

    return {play, get, displayBoard}
})();


const player1 = (function () {
    const play = (value) => {
        gameBoard.play(value, 'X');
        return gameBoard.displayBoard();
    };
    
    return { play }
})();

const player2 = (function () {
    const play = (value) => {
        gameBoard.play(value, 'O');
        return gameBoard.displayBoard();
    };

    return { play }
})();


let gameState = (function(){
    // check Win condition
    // check Tie condition
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
            return player2.play(value);
        } else {
            console.log('Not valid move');
        }
    };
    return {p1Play, p2Play}
})();
