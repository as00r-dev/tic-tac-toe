// Board
const gameBoard = (function () {
	const _board = ["X", "O", "X", "X", "O", "X", "X", "O", "X"];

	const getState = function () {
		// Returns one of 4 states - X won, O won, Draw, undecided
	};

	const setItemAt = function (choice, position) {
		_board[position] = choice;
	};

	const resetState = function () {
		for (let i = 0; i < 9; i++) {
			setItemAt(null, i);
		}
	};

	return {
		getState,
		setItemAt,
		resetState,
	};
})();

// Main Game
const ticTacToe = (function () {
	let _playerX = {};
	let _playerO = {};

	const _playerFactory = function (name, choice) {
		const playMove = (position) => gameBoard.setItemAt(choice, position);
		return { name, choice, playMove };
	};

	const isUndecided = function () {
		return gameBoard.getState();
	};

	const currentPlayer = function () {
		// Returns the current player
	};

	const createPlayer = function (name, choice) {
		// call player factory and assign to
		// _playerX or _playerO according to choice
	};

	return { createPlayer, currentPlayer, isUndecided };
})();

// To interact with DOM
const DOM = (function () {
	const _gridBoxes = document.querySelectorAll(".box");

	_gridBoxes.forEach((box) => {
		box.addEventListener("click", _handleClick);
	});

	function _handleClick(e) {
		const player = ticTacToe.currentPlayer();
		player.playMove(player.choice, +e.target.id);
		if (!ticTacToe.isUndecided) {
			_declareResult();
		}
	}

	const _declareResult = function () {
		// Declares result
	};
})();
