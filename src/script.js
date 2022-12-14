// Board
const gameBoard = (function () {
	const _board = [null, null, null, null, null, null, null, null, null];
	let lastPlayer = null;

	const _setLastPlayer = function (choice) {
		lastPlayer = choice;
	};

	const getBoardItemAt = function (position) {
		if (_board[position] === null) return "";
		return `${_board[position]}`;
	};

	const getBoardCondition = function () {
		const winningConditions = [
			[0, 4, 8],
			[2, 4, 6],
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
		];

		for (let i = 0; i < winningConditions.length; i++) {
			const [a, b, c] = winningConditions[i];

			if (
				_board[a] !== null &&
				_board[a] === _board[b] &&
				_board[b] === _board[c]
			) {
				return _board[a];
			}
		}

		if (_board.includes(null)) {
			return "UNDECIDED";
		} else {
			return "DRAW";
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

	return {
		getBoardCondition,
		getBoardItemAt,
		getLastPlayer,
		resetState,
		setItemAt,
	};
})();

// Main Game
const ticTacToe = (function () {
	let _playerX;
	let _playerO;
	let mode = "LOCAL";
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
		if (gameBoard.getBoardCondition() === "X") return _playerX;
		if (gameBoard.getBoardCondition() === "O") return _playerO;
		return "NO WINNER";
	};

	const isUndecided = function () {
		return gameBoard.getBoardCondition() === "UNDECIDED";
	};

	const startGame = function (xName, oName, modeName) {
		_createPlayer(xName, "X");
		_createPlayer(oName, "O");
		mode = modeName;
		gameBoard.resetState();
	};

	const getGameMode = function () {
		return mode;
	};

	return { getCurrentPlayer, isUndecided, getWinner, startGame, getGameMode };
})();

// To interact with DOM
const ui = (function () {
	const _gridBoxes = document.querySelectorAll(".box");
	const _startLocal = document.querySelector("#startLocal");
	const _startEasy = document.querySelector("#startEasy");
	const _startHard = document.querySelector("#startHard");
	const _startMenu = document.querySelector(".start-menu");
	const _mainGame = document.querySelector("main");
	const _resultScreen = document.querySelector(".result-screen");
	const _restartButton = document.querySelector("#restart");
	const _resultContainer = document.querySelector(".result-container");

	const _handleGameClick = function (e) {
		const player = ticTacToe.getCurrentPlayer();
		const gameMode = ticTacToe.getGameMode();

		if (!gameBoard.getBoardItemAt(e.target.id)) player.playMove(e.target.id);

		if (gameMode === "EASY") ai.playMoveEasy();
		if (gameMode === "HARD") ai.playMoveHard();

		_renderBoard();

		if (
			gameBoard.getBoardCondition() === "X" ||
			gameBoard.getBoardCondition() === "O" ||
			gameBoard.getBoardCondition() === "DRAW"
		) {
			_declareResult();
		}
	};

	const _renderBoard = function () {
		for (let i = 0; i < _gridBoxes.length; i++) {
			const boardItem = gameBoard.getBoardItemAt(i);
			const xKitty = _gridBoxes[i].lastElementChild;
			const oKitty = _gridBoxes[i].firstElementChild;
			if (boardItem === "X") {
				xKitty.classList.remove("display-none");
			} else if (boardItem === "O") {
				oKitty.classList.remove("display-none");
			}
		}
	};

	const _handleLocal = function (e) {
		const _xInput = document.querySelector("#X");
		const _oInput = document.querySelector("#O");
		ticTacToe.startGame(_xInput.value, _oInput.value, "LOCAL");
		_mainGame.classList.toggle("display-none");
		_startMenu.classList.toggle("display-none");
	};

	const _handleEasy = function () {
		// for easy mode button
		const _xInput = document.querySelector("#X");
		ticTacToe.startGame(_xInput.value, "Easy Bot", "EASY");
		_mainGame.classList.toggle("display-none");
		_startMenu.classList.toggle("display-none");
	};

	const _handleHard = function () {
		// for hard mode button
		const _xInput = document.querySelector("#X");
		ticTacToe.startGame(_xInput.value, "Hard Bot", "HARD");
		_mainGame.classList.toggle("display-none");
		_startMenu.classList.toggle("display-none");
	};

	const _handleRestartClick = function (e) {
		gameBoard.resetState();
		_resultScreen.classList.toggle("display-none");
		_startMenu.classList.toggle("display-none");
		for (let i = 0; i < _gridBoxes.length; i++) {
			const oKitty = _gridBoxes[i].firstElementChild;
			const xKitty = _gridBoxes[i].lastElementChild;
			if (!oKitty.classList.contains("display-none")) {
				oKitty.classList.add("display-none");
			}
			if (!xKitty.classList.contains("display-none")) {
				xKitty.classList.add("display-none");
			}
		}
	};

	const _declareResult = function () {
		const resultText = gameBoard.getBoardCondition();
		_resultContainer.textContent = "";
		if (resultText === "DRAW") {
			_resultContainer.textContent = "ITS A DRAW!";
		} else {
			_resultContainer.textContent = `${ticTacToe.getWinner().name} WON!`;
		}
		_resultScreen.classList.toggle("display-none");
		_mainGame.classList.toggle("display-none");
	};

	_gridBoxes.forEach((box) => {
		box.addEventListener("click", _handleGameClick);
	});

	_startLocal.addEventListener("click", _handleLocal);

	_startEasy.addEventListener("click", _handleEasy);

	_startHard.addEventListener("click", _handleHard);

	_restartButton.addEventListener("click", _handleRestartClick);
})();

// AI
const ai = (function () {
	const playMoveEasy = function () {
		let position = Math.floor(Math.random() * 9);
		while (gameBoard.getBoardItemAt(position)) {
			position = Math.floor(Math.random() * 9);
		}
		gameBoard.setItemAt("O", position);
	};

	const playMoveHard = function () {
		let bestScore = -Infinity;
		let bestMove;
		for (let i = 0; i < 9; i++) {
			if (!gameBoard.getBoardItemAt(i)) {
				gameBoard.setItemAt("O", i);
				const score = _minimax(0, false);
				gameBoard.setItemAt(null, i);
				if (score > bestScore) {
					bestScore = score;
					bestMove = i;
				}
			}
		}
		gameBoard.setItemAt("O", bestMove);
	};

	const _minimax = function (depth, isMaximizing) {
		const result = gameBoard.getBoardCondition();
		const scores = {
			X: depth - 10,
			O: 10 - depth,
			DRAW: 0,
		};

		if (result !== "UNDECIDED") {
			return scores[result];
		}

		let bestScore = isMaximizing ? -Infinity : Infinity;

		for (let i = 0; i < 9; i++) {
			let score;
			if (!gameBoard.getBoardItemAt(i)) {
				if (isMaximizing) {
					gameBoard.setItemAt("O", i);
					score = _minimax(depth + 1, false);
					bestScore = Math.max(bestScore, score);
				} else {
					gameBoard.setItemAt("X", i);
					score = _minimax(depth + 1, true);
					bestScore = Math.min(bestScore, score);
				}
				gameBoard.setItemAt(null, i);
			}
		}
		return bestScore;
	};

	return { playMoveEasy, playMoveHard };
})();
