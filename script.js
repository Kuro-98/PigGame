'use strict';

// FIRST BLOCK //
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
// SECOND BLOCK
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

// SECOND BLOCK
// FIRST BLOCK //

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

////////////////////////////////////////////////////////
// SECOND BLOCK
//Rolling dice functionality

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generar un roll random del dado
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Mostrar la imagen del dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Checar si el dado dio 1 como resultado, !:continue
    if (dice !== 1) {
      //add the dice to the score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      //true: cambiar de jugardor
    }
  }
});
// SECOND BLOCK

// THIRD BLOCK //
btnHold.addEventListener('click', () => {
  if (playing) {
    //1. Añadir el score actual al jugador activo
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Revisar que el score de los jugadores sea mayor o igual a 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      //Finalizar el juego
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //si no cambiar al siguiente jugador
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// THIRD BLOCK //
