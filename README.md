# Tic Tac Toe With Unbeatable AI

This project was made for practicing the Module Pattern, Factory Functions and minimax algorithm.

## Acknowledgements

- [Project Prompt](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe)

## Demo

https://as00r-dev.github.io/tic-tac-toe/

## Made using

HTML, CSS, JavaScript and Love.

## script.js description

- `gameBoard` : This module is responsible for handling the board. We use it to get the current state of board (if game ended or not), getting items at any position of board, resetting the board to be empty, and also setting a move at any position.

- `ticTacToe` : This module is used to manage the game logic, It starts new game, creates players, tracks current player, game modes etc.

- `ui` : This module is used to interact with the DOM, add event listeners, handle events etc.

- `ai` : This module contains the logic for easy and hard AI. Easy AI plays random available moves. Hard AI plays a perfect game and never loses.

## What I Learned

- Using the Module Pattern and Factory Functions.
- Having separate modules for different related tasks.
- Implementing a basic AI which is unbeatable using minimax algorithm.

## Todo

- [ ] Improve UI through animations and transitions.
- [ ] Add sound.
- [ ] Add feature for best of 5 matches.
- [ ] Add support for onlin PvP.
