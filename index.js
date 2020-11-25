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

//variable declaring
let scores,activePlayer,current,playing;

// starting conditions in init function
const init = () => {
  scores = [0, 0];
  activePlayer = 0;
  current = 0;
  playing = true;

  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  showingDice.classList.add('hidden');
  activeSign.forEach(item => {
    item.classList.add('hidden');
  })

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner')
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  // display active sign
  Array.from(activeSign)[activePlayer].classList.remove('hidden');
}

//calling init function
init();

// switch player function
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//toggle active sign function
const toggleActiveSign = () => {
  Array.from(activeSign)[activePlayer].classList.toggle('hidden');
}

//rolling the dice
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
      //toggle active sign
      toggleActiveSign();
      //switch player
      switchPlayer();
      //toggle active sign
      toggleActiveSign();
    }
  }
})

// holding tha current value to total value
btnHold.addEventListener('click', () => {
  if (playing) {
    //toggle active sign
    toggleActiveSign();

    //holding current score to total score
    scores[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    //checking if total score is greater or equal to 100 or not. if true current player will win otherwise switch the player
    if (scores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      playing = false;

      if (playing === false) {
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
      }
    } else {
      //switch player
      switchPlayer();
    }

    //toggle active sign
    toggleActiveSign();
  }
})

// game restart
btnNew.addEventListener('click', init);