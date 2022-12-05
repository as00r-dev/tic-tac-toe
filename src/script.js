// Board
const gameBoard = (function () {
	const _board = [null, null, null, null, null, null, null, null, null];

	// Returns "X" or "O" or "null" or "DRAW"
	const getState = function () {
		if (_board[0] === _board[4] && _board[4] === _board[8]) {
			if (_board[0] !== null) return `${_board[0]}`;
		}
		if (_board[2] === _board[4] && _board[4] === _board[6]) {
			if (_board[2] !== null) return `${_board[2]}`;
		}
		if (_board[0] === _board[1] && _board[1] === _board[2]) {
			if (_board[0] !== null) return `${_board[0]}`;
		}
		if (_board[3] === _board[4] && _board[4] === _board[5]) {
			if (_board[3] !== null) return `${_board[3]}`;
		}
		if (_board[6] === _board[7] && _board[7] === _board[8]) {
			if (_board[6] !== null) return `${_board[6]}`;
		}
		if (_board[0] === _board[3] && _board[3] === _board[6]) {
			if (_board[0] !== null) return `${_board[0]}`;
		}
		if (_board[1] === _board[4] && _board[4] === _board[7]) {
			if (_board[1] !== null) return `${_board[1]}`;
		}
		if (_board[2] === _board[5] && _board[5] === _board[8]) {
			if (_board[2] !== null) return `${_board[2]}`;
		}
		if (_board.includes(null)) {
			return `UNDECIDED`;
		} else {
			return `DRAW`;
		}
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
