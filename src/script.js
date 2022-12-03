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
		return choice === "X" || choice === "O";
	};

	const _isPositionValid = function (position) {
		return position < 9 && position > -1;
	};

	return {
		showItemAt,
		change,
	};
})();

// A module to interact with DOM
const displayController = (function (doc) {
	const render = function () {
		doc.getElementById();
	};
})(document);
