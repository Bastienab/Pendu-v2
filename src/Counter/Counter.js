import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({counter, gameState}) => (
  <div className="essai-score">
    <p>Essai n°: {counter}</p>
    <p>Jeu {gameState}</p>
  </div>
)

Counter.propType = {
  counter: PropTypes.number.isRequired,
  gameState: PropTypes.oneOf([
    "gagné",
    "en cours",
    "perdu"
  ]).isRequired
}

export default Counter;