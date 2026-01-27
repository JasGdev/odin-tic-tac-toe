// Gameboard object

// function game(){
//     this.gameBoard = ['', '', '', '', '', '', '', '', '']
//     this.gameState
//     this.player1
//     this.player2

//     // players can call play(x,y) on valid locations and the gameBoard will be updated
//     // gameState will constantly check whether win/tie condition is achieved
    
// }

let gameBoard = (function() {
    let gameBoard = ['', '', '', '', '', '', '', '', '']
    let play11 = (symbol) => { gameBoard[0] = symbol; };
    let play12 = (symbol) => { gameBoard[1] = symbol; };
    let play13 = (symbol) => { gameBoard[2] = symbol; };
    let play21 = (symbol) => { gameBoard[3] = symbol; };
    let play22 = (symbol) => { gameBoard[4] = symbol; };
    let play23 = (symbol) => { gameBoard[5] = symbol; };
    let play31 = (symbol) => { gameBoard[6] = symbol; };
    let play32 = (symbol) => { gameBoard[7] = symbol; };
    let play33 = (symbol) => { gameBoard[8] = symbol; };
    let displayBoard = () => gameBoard;

    return { play11, play12, play13, play21, play22, play23, play31, play32, play33, displayBoard};
})();



const player1 = (function () {
    const play11 = () => {
        gameBoard.play11('X');
        return gameBoard.displayBoard();
    };
    const play12 = () => {
        gameBoard.play12('X');
        return gameBoard.displayBoard();
    };
    const play13 = () => {
        gameBoard.play13('X');
        return gameBoard.displayBoard();
    };
    const play21 = () => {
        gameBoard.play21('X');
        return gameBoard.displayBoard();
    };
    const play22 = () => {
        gameBoard.play22('X');
        return gameBoard.displayBoard();
    };
    const play23 = () => {
        gameBoard.play23('X');
        return gameBoard.displayBoard();
    };
    const play31 = () => {
        gameBoard.play31('X');
        return gameBoard.displayBoard();
    };
    const play32 = () => {
        gameBoard.play32('X');
        return gameBoard.displayBoard();
    };
    const play33 = () => {
        gameBoard.play33('X');
        return gameBoard.displayBoard();
    };
    return { play11, play12, play13, play21, play22, play23, play31, play32, play33 };
})();

const player2 = (function () {
    const play11 = () => {
        gameBoard.play11('O');
        return gameBoard.displayBoard();
    };
    const play12 = () => {
        gameBoard.play12('O');
        return gameBoard.displayBoard();
    };
    const play13 = () => {
        gameBoard.play13('O');
        return gameBoard.displayBoard();
    };
    const play21 = () => {
        gameBoard.play21('O');
        return gameBoard.displayBoard();
    };
    const play22 = () => {
        gameBoard.play22('O');
        return gameBoard.displayBoard();
    };
    const play23 = () => {
        gameBoard.play23('O');
        return gameBoard.displayBoard();
    };
    const play31 = () => {
        gameBoard.play31('O');
        return gameBoard.displayBoard();
    };
    const play32 = () => {
        gameBoard.play32('O');
        return gameBoard.displayBoard();
    };
    const play33 = () => {
        gameBoard.play33('O');
        return gameBoard.displayBoard();
    };
    return { play11, play12, play13, play21, play22, play23, play31, play32, play33 };
})();

