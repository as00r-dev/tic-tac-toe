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

	const _isChoiceValid = (choice) => choice === "X" || choice === "O";

	const _isPositionValid = (position) => position < 9 && position > -1;

	return {
		showItemAt,
		change,
	};
})();

// Player Factory
const playerFactory = function (name, choice) {
	const playMove = (position) => gameBoard.change(choice, position);
	return { name, choice, playMove };
};
