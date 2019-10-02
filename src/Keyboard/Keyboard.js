import React from 'react'

const Keyboard = ({letter, feedback, onClick}) => (
  <button className={`btn btn-${feedback} m-1`} onClick={() => onClick(letter)}>{letter}</button>
)

export default Keyboard;