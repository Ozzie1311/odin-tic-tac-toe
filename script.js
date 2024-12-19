/** Setting a gameBoard module (iiefs) */
/*** Este modulo se encarga solamente de lo que es el renderizado del juego como tal, o sea, que el juego se muestre ***/
const gameBoard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
  let boardHTML = ''
  gameboard.forEach((square, index) => {
    boardHTML += `<div class="square" id="square-${index}">${square}</div>`
    });
    
    document.querySelector('#gameboard').innerHTML = boardHTML;
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', Game.handleClick)
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  const getGameBoard = () => gameboard;

  return { render, update, getGameBoard };

})();

/** Setting a factory function for the creation of the players **/
const createPlayer = (name, mark) => {
  return {
    name,
    mark
  };
};

/** Setting a game module (iiEFs) **/
const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector('#player1').value, 'X'),
      createPlayer(document.querySelector('#player2').value, 'O')
    ];
    currentPlayerIndex = 0; 
    gameOver = false;
    gameBoard.render();
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split('-')[1]);
    if(gameBoard.getGameBoard()[index] !== '') {
      return;
    }
    gameBoard.update(index, players[currentPlayerIndex].mark);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restart = () => {
    for(let i = 0; i < 9; i++) {
      gameBoard.update(i, "");
    };
    gameBoard.render();
  };

  return { start, handleClick, restart }
})();

const restartBtn = document.querySelector('#restart-button');
restartBtn.addEventListener('click', () => {
  Game.restart();
})


const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    Game.start();
    console.log('Hola mundo')
    
});