// Board
const gameBoard = (function () {
	const _board = [null, null, null, null, null, null, null, null, null];
	let lastPlayer = null;

	const getBoardCondition = function () {
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
		_setLastPlayer(choice);
	};

	const resetState = function () {
		for (let i = 0; i < 9; i++) {
			setItemAt(null, i);
		}
		lastPlayer = null;
	};

	const getLastPlayer = function () {
		return lastPlayer;
	};

	const _setLastPlayer = function (choice) {
		lastPlayer = choice;
	};

	return {
		getBoardCondition,
		getLastPlayer,
		resetState,
		setItemAt,
	};
})();

// Main Game
const ticTacToe = (function () {
	let _playerX;
	let _playerO;

	let winner;

	const _playerFactory = function (name, choice) {
		const playMove = (position) => gameBoard.setItemAt(choice, position);
		return { name, choice, playMove };
	};

	const _createPlayer = function (name, choice) {
		if (choice === "O") {
			_playerO = _playerFactory(name, choice);
		} else {
			_playerX = _playerFactory(name, choice);
		}
	};

	const getCurrentPlayer = function () {
		const lastPlayer = gameBoard.getLastPlayer();
		if (lastPlayer === "X") return _playerO;
		return _playerX;
	};

	const getWinner = function () {
		return winner;
	};

	// Returns false when game is won or draw
	const isUndecided = function () {
		return gameBoard.getBoardCondition() === "UNDECIDED";
	};

	const startGame = function (heroName, enemyName, heroChoice, enemyChoice) {
		_createPlayer(heroName, heroChoice);
		_createPlayer(enemyName, enemyChoice);
		gameBoard.resetState();
	};

	return { getCurrentPlayer, isUndecided, getWinner, startGame };
})();

// To interact with DOM
const ui = (function () {
	const _gridBoxes = document.querySelectorAll(".box");

	const _handleGameClick = function (e) {
		const player = ticTacToe.getCurrentPlayer();
		// player.playMove(e.target.id);
		console.log(e.target.id, player);
	};

	_gridBoxes.forEach((box) => {
		box.addEventListener("click", _handleGameClick);
	});

	const _handleMatchStartClick = function (e) {
		// takes names, choice and calls ticTacToe.startGame()
		// go from main menu to game screen
	};

	const _declareResult = function () {
		// open a modal declaring winner
	};
})();
