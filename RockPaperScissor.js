const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use middleware to parse JSON in the request body
app.use(express.json());

// Function to determine the winner of Rock, Paper, Scissors
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'It\'s a tie!';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You win!';
  } else {
    return 'Computer wins!';
  }
}

// Endpoint to play Rock, Paper, Scissors
app.post('/play', (req, res) => {
  const { playerChoice } = req.body;

  if (['rock', 'paper', 'scissors'].includes(playerChoice)) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    const result = determineWinner(playerChoice, computerChoice);

    res.setHeader('Content-Type', 'application/json');
    res.json({ message: result, computerChoice });
  } else {
    res.status(400).json({ message: 'Invalid choice. Please choose rock, paper, or scissors.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
