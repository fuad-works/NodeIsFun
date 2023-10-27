const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize the Chess board
let chessBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

// Function to display the Chess board
function displayBoard() {
  for (let i = 0; i < 8; i++) {
    console.log(chessBoard[i].join(' '));
  }
}

// Endpoint to make a move
app.post('/makeMove', (req, res) => {
  const { from, to } = req.body;

  // Simplified move - update the 'to' position with the piece from 'from'
  chessBoard[to.row][to.col] = chessBoard[from.row][from.col];
  chessBoard[from.row][from.col] = '';

  // Display the updated board
  displayBoard();

  res.json({ message: 'Move successful', board: chessBoard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
