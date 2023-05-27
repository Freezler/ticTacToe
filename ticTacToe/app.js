/**
 * Runs a game of Tic Tac Toe.
 */




const playTicTacToe = async function () {
	// Initialize the game board to all zeros.
	const board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	// Define player symbols.
	const player1 = 'X';
	const player2 = 'O';
	// Start with player 1.
	let currentPlayer = player1;
	// Loop until there is a winner or a draw.
	while (true) {
		// Display the current state of the board.
		displayBoard(board);
		// Get the player's move.
		let move = await getMove(board);
		// Parse the move into a row and column.
		const [row, col] = move.split('-').map(Number);
		// Check if the move is invalid.
		if (board[row][col] !== 0) {
			console.log('Invalid move. Please try again.');
			continue;
		}
		// Update the board with the player's move.
		board[row][col] = currentPlayer;
		// Check if the player has won.
		if (checkWin(board, currentPlayer)) {
			displayBoard(board);
			document.querySelector('#winner').textContent = currentPlayer + ' wins!';
			break;
		}
		// Check if the game is a draw.
		if (checkDraw(board)) {
			displayBoard(board);
			document.querySelector('#winner').textContent = 'Draw!';
			break;
		}
		// Switch to the other player's turn.
		currentPlayer = (currentPlayer === player1) ? player2 : player1;
	}
};


const displayBoard = function (board) {
	const table = document.querySelector('table');
	table.style.display = 'table';
	const cells = document.querySelectorAll('td');
	for (let i = 0; i < cells.length; i++) {
		const [row, col] = cells[i].id.split('-').map(Number);
		const cellValue = board[row][col];
		cells[i].textContent = (cellValue === 0) ? '' : cellValue;

		const win = document.querySelector('#winner');
		win.textContent = '';
	}
};

const getMove = function (board) {
	return new Promise(resolve => {
		const cells = document.querySelectorAll('td');
		cells.forEach(cell => {
			cell.addEventListener('click', function handleClick() {
				cells.forEach(cell => {
					cell.removeEventListener('click', handleClick);
				});
				resolve(cell.id);
			});
		});
	});
};

const checkWin = function (board, player) {
	// Check rows
	for (let row = 0; row < board.length; row++) {
		if (board[row].every(cell => cell === player)) {
			return true;
		}
	}
	// Check columns
	for (let col = 0; col < board[0].length; col++) {
		if (board.every(row => row[col] === player)) {
			return true;
		}
	}
	// Check diagonals
	if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
		return true;
	}
	if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
		return true;
	}
	return false;
};

const checkDraw = function (board) {
	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[0].length; col++) {
			if (board[row][col] === 0) {
				return false;
			}
		}
	}
	return true;
};

const reset = function () {
	document.querySelector('#winner').textContent = '';
	const cells = document.querySelectorAll('td');
	for (let i = 0; i < cells.length; i++) {
		cells[i].textContent = '';
	}

}

document.querySelector('#start-game').addEventListener('click', playTicTacToe);
document.querySelector('#reset').addEventListener('click', reset);