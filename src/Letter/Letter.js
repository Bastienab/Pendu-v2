import React from 'react';

const MASK_SYMBOL = '_'

const Letter = ({ letter, feedback}) => (
  <div className={`letter ${feedback}`} >
    <span className="underscore-for-letters">
      {feedback === 'hidden' ? MASK_SYMBOL : letter}
    </span>
  </div>
)

export default Letter