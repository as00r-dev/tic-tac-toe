// A module to interact with board
const gameBoard = (function () {
	const board = ["X", "O", "X", "X", "O", "X", "X", "O", "X"];

	const showItemAt = function (position) {
		if (_isPositionValid(position)) {
			const itemAtPosition = `${board[position]}`;
			return itemAtPosition;
		} else {
			return `ERROR: ${position} is not a position`;
		}
	};

	const change = function (choice, position) {
		if (_isChoiceValid(choice) && _isPositionValid(position)) {
			board[position] = choice;
			return `SUCCESS: added ${choice} at ${position}`;
		} else {
			return `ERROR: can't add ${choice} at ${position}`;
		}
	};

	const _isChoiceValid = function (choice) {
		return choice === "X" || choice === "O" || choice === null;
	};

	const _isPositionValid = function (position) {
		return position < 9 && position > -1;
	};

	const resetBoard = function () {
		for (let i = 0; i < 9; i++) {
			gameBoard.change(null, i);
		}
	};

	return {
		showItemAt,
		change,
		resetBoard,
	};
})();

// Player factory
const playerFactory = function (name, choice) {
	const playMove = (position) => gameBoard.change(choice, position);

	return { name, choice, playMove };
};

// Main Game module
const ticTacToe = (function () {
	const players = [];

	const startNewGame = function () {
		gameBoard.resetBoard();
		_emptyPlayersArray();
	};

	const _emptyPlayersArray = function () {
		for (let i = 0; i < players.length; i++) {
			players.pop();
		}
	};

	const createPlayer = function (name, choice) {
		if (players.length < 2) {
			players.push(playerFactory(name, choice));
		}
	};

	return { startNewGame, createPlayer };
})();

// Module to interact with DOM
const DOM = (function () {
	const gridBoxes = document.querySelectorAll(".box");

	const renderBoard = function () {
		for (let i = 0; i < 9; i++) {
			gridBoxes[i].textContent = "";
			gridBoxes[i].textContent = gameBoard.showItemAt(i);
		}
	};

	return { renderBoard };
})();
