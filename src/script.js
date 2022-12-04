// Board Module
const gameBoard = (function () {
	const _board = ["X", "O", "X", "X", "O", "X", "X", "O", "X"];

	const _isChoiceValid = function (choice) {
		return choice === "X" || choice === "O" || choice === null;
	};

	const _isPositionValid = function (position) {
		return position < 9 && position > -1;
	};

	const getItemAt = function (position) {
		if (_isPositionValid(position)) {
			const itemAtPosition = `${_board[position]}`;
			return itemAtPosition;
		} else {
			return `ERROR: ${position} is not a position`;
		}
	};

	const setItemAt = function (choice, position) {
		if (_isChoiceValid(choice) && _isPositionValid(position)) {
			_board[position] = choice;
			return `SUCCESS: added ${choice} at ${position}`;
		} else {
			return `ERROR: can't add ${choice} at ${position}`;
		}
	};

	const resetBoard = function () {
		for (let i = 0; i < 9; i++) {
			setItemAt(null, i);
		}
	};

	return {
		getItemAt,
		setItemAt,
		resetBoard,
	};
})();

// Main Game module
const ticTacToe = (function () {
	const _players = [];

	const _playerFactory = function (name, choice) {
		const playMove = (position) => gameBoard.setItemAt(choice, position);

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

	_gridBoxes.forEach((box) => {
		box.addEventListener("click", handleClick);
	});

	function handleClick(e) {
		console.log(e.target);
	}

	const displayBoardOnScreen = function () {
		for (let i = 0; i < 9; i++) {
			_gridBoxes[i].textContent = "";
			if (gameBoard.getItemAt(i) !== "null") {
				_gridBoxes[i].textContent = gameBoard.getItemAt(i);
			}
		}
	};

	return { displayBoardOnScreen };
})();
