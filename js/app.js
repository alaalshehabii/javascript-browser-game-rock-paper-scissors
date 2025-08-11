/*-------------------------------- Constants --------------------------------*/
const choices = ['rock', 'paper', 'scissors'];

/*-------------------------------- Variables --------------------------------*/
let playerChoice;
let computerChoice;
let msg;

/*------------------------ Cached Element References ------------------------*/
const resultDisplayEl = document.querySelector('#result-display');
const thumbsDownEl = document.querySelector('#thumbsDown');

/*-------------------------------- Functions --------------------------------*/
const getPlayerChoice = (event) => {
  playerChoice = event.target.id;
};

const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerChoice = choices[randomIndex];
};

const compare = () => {
  if (playerChoice === computerChoice) {
    msg = 'You tied!';
  } else if (
    (playerChoice === choices[0] && computerChoice === choices[2]) ||
    (playerChoice === choices[1] && computerChoice === choices[0]) ||
    (playerChoice === choices[2] && computerChoice === choices[1])
  ) {
    msg = 'Congrats! You win!';
    launchConfetti(); // 🎉 Confetti when player wins
  } else {
    msg = 'You lose! Try again?';
    showThumbsDown(); // 👎 Show thumbs-down when computer wins
  }
};

const render = () => {
  if (!playerChoice && !computerChoice && !msg) {
    resultDisplayEl.textContent = '';  // Clear display on reset
  } else {
    resultDisplayEl.textContent = `You chose ${playerChoice} and the computer chose ${computerChoice}. ${msg}`;
  }
};

const play = (event) => {
  getPlayerChoice(event);
  getComputerChoice();
  compare();
  render();
};

const resetGame = () => {
  playerChoice = null;
  computerChoice = null;
  msg = '';
  render();
};

/* 🎉 Confetti Function */
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#b3e5fc', '#c8f7c5', '#ffffff'] // pastel colors
  });
}

/* 👎 Thumbs-Down Animation Function */
function showThumbsDown() {
  thumbsDownEl.classList.add('show');
  setTimeout(() => {
    thumbsDownEl.classList.remove('show');
  }, 800); // Hide after 0.8s
}

/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('#rock').addEventListener('click', play);
document.querySelector('#paper').addEventListener('click', play);
document.querySelector('#scissors').addEventListener('click', play);
document.querySelector('#resetButton').addEventListener('click', resetGame);
