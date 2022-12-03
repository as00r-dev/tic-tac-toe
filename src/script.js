// A module to interact with board;
const gameBoard = (function () {
	const board = ["X", "O", "X", "X", "O", "X", "X", "O", "X"];

	const showBoard = function () {
		return board;
	};

	const changeBoard = function (choice, position) {
		if (_isInputValid(choice, position)) {
			board[position] = choice;
			return "SUCCESS!";
		} else {
			return "FAILED!";
		}
	};

	const _isInputValid = function (choice, position) {
		return position >= 8 || position <= 0 || (choice !== "X" && choice !== "O")
			? false
			: true;
	};

	return {
		showBoard,
		changeBoard,
	};
})();

// A module to interact with DOM
const displayController = (function (doc) {
	const render = function () {
		doc.getElementById();
	};
})(document);
