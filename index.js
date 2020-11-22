'use strict'

//selecting elements
const totalScore0 = document.querySelector('#score--0');
const totalScore1 = document.querySelector('#score--1');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const showingDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activeSign = document.querySelectorAll('.active--sign');

// starting conditions
totalScore0.textContent = 0;
totalScore1.textContent = 0;
showingDice.classList.add('hidden');

activeSign.forEach(item => {
  item.classList.add('hidden');
})

let scores = [0, 0];
let current = 0;
let activePlayer = 0;
let playing = true;

// switch player
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//toggle active sign
const toggleActiveSign = () => {
  Array.from(activeSign)[activePlayer].classList.toggle('hidden');
}
// display active sign
Array.from(activeSign)[activePlayer].classList.remove('hidden');

//rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // generating random number between 1 to 6
    const dice = Math.floor(Math.random() * 6) + 1;

    //display dice
    showingDice.classList.remove('hidden');
    showingDice.src = `img/dice-${dice}.png`;

    //checking for rolled 1: if true switch to next player else add number to current score
    if (dice !== 1) {
      current += dice;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    } else {
      toggleActiveSign();
      switchPlayer();
      toggleActiveSign();
    }
  }
})
// event listener
btnHold.addEventListener('click', () => {
  if (playing) {
    toggleActiveSign();

    scores[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      playing = false;

      if (playing === false) {
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
      }
    } else {
      switchPlayer();
    }

    toggleActiveSign();
  }
})

btnNew.addEventListener('click', () => {
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  showingDice.classList.add('hidden');

  activeSign.forEach(item => {
    item.classList.add('hidden');
  })

  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active')

  scores = [0, 0];
  activePlayer = 0;
  current = 0;
  playing = true;

  Array.from(activeSign)[activePlayer].classList.remove('hidden');

  document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]

  document.querySelector(`#current--${activePlayer}`).textContent = current;
})