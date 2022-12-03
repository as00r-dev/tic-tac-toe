// A module to interact with board
const gameBoard = (function () {
	const _board = ["X", "O", "X", "X", "O", "X", "X", "O", "X"];

	const _isChoiceValid = function (choice) {
		return choice === "X" || choice === "O" || choice === null;
	};

	const _isPositionValid = function (position) {
		return position < 9 && position > -1;
	};

	const showItemAt = function (position) {
		if (_isPositionValid(position)) {
			const itemAtPosition = `${_board[position]}`;
			return itemAtPosition;
		} else {
			return `ERROR: ${position} is not a position`;
		}
	};

	const change = function (choice, position) {
		if (_isChoiceValid(choice) && _isPositionValid(position)) {
			_board[position] = choice;
			return `SUCCESS: added ${choice} at ${position}`;
		} else {
			return `ERROR: can't add ${choice} at ${position}`;
		}
	};

	const resetBoard = function () {
		for (let i = 0; i < 9; i++) {
			change(null, i);
		}
	};

	return {
		showItemAt,
		change,
		resetBoard,
	};
})();

// Player factory

// Main Game module
const ticTacToe = (function () {
	const _players = [];

	const _playerFactory = function (name, choice) {
		const playMove = (position) => gameBoard.change(choice, position);

		return { name, choice, playMove };
	};

	const _emptyPlayersArray = function () {
		for (let i = 0; i < _players.length; i++) {
			_players.pop();
		}
	};

	const startNewGame = function () {
		gameBoard.resetBoard();
		_emptyPlayersArray();
	};

	const createPlayer = function (name, choice) {
		if (_players.length < 2) {
			_players.push(_playerFactory(name, choice));
		}
	};

	return { startNewGame, createPlayer };
})();

// Module to interact with DOM
const DOM = (function () {
	const _gridBoxes = document.querySelectorAll(".box");

	const displayBoardOnScreen = function () {
		for (let i = 0; i < 9; i++) {
			_gridBoxes[i].textContent = "";
			if (gameBoard.showItemAt(i) !== "null") {
				_gridBoxes[i].textContent = gameBoard.showItemAt(i);
			}
		}
	};

	return { displayBoardOnScreen };
})();
