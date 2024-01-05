let currentPlayer = 'X';
let gameActive = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function startGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
  document.getElementById('grid').innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleClick);
    document.getElementById('grid').appendChild(cell);
  }
}

function handleClick(event) {
  const cellIndex = event.target.getAttribute('data-index');
  if (gameBoard[cellIndex] === '' && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkWin();

    if (!gameActive) {
      return; // If game is not active, stop further moves
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
  }
}


function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  let winner = null;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winner = gameBoard[a];
      break;
    }
  }

  if (winner) {
    gameActive = false;
    document.getElementById('status').innerText = `Player ${winner} wins!`;
  } else if (!gameBoard.includes('')) {
    gameActive = false;
    document.getElementById('status').innerText = "Game is tied!";
  } else {
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
  }
}

