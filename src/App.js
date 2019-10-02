import React, { Component } from 'react';
import './App.css';
import allwords from './Library/WordsArray';
import alphabet from './Library/Alphabet';
import Letter from './Letter/Letter';
import Keyboard from './Keyboard/Keyboard';
import Counter from './Counter/Counter';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      letters: this.generateWords(),
      keyboards: this.generateKeywords(),
      selection: [],
      gameState: "en cours"
    }
  }
  generateWords() {
    const result = []
    let oneWord = Math.floor(Math.random()* allwords.length)
    oneWord = allwords[oneWord]
    const word = oneWord.split('')
    while (word.length>0) {
      const letter = word.shift()
      result.push(letter)
    }
    return result
  }
  generateKeywords() {
    const result = []
    const size = 26
    const allLetters = alphabet.split('')
    while (result.length < size) {
      const letter = allLetters.shift()
      result.push(letter)
    }
    return result
  }
  getFeedback(letter) {
    const { selection } = this.state
    return selection.includes(letter)
  }
  trying = () => {
    const {letters, selection} = this.state
    return selection.filter(elt => !letters.includes(elt)).length
  }
  gameState = () => {
    const { letters, selection } = this.state
    const lastTests = 12 - this.trying()
    const findWord = letters.filter(elt => selection.includes(elt)).length === letters.length
    if (lastTests > 0 && findWord) {
      this.setState({gameState : "gagné"})
    } else if (lastTests > 0 ) {
      return
    } else {
      this.setState({gameState : "perdu"})
    }
  }
  newGame = () => {
    this.setState({selection: [], letters: this.generateWords(), gameState : "en cours" })
  }
  handleClick = letter => {
    const { selection, gameState } = this.state
    if(gameState === "en cours") {
      this.setState({selection: [...selection, letter]}, this.gameState)
    }
  }
  render() {
    const { letters, keyboards } = this.state;
    return (
      <div>
        <div className="container">
          <div className="d-flex justify-content-between align-items-baseline">
            <div>
              <h1 className="title">Jeu du pendu</h1>
              <button className="btn btn-success" onClick={this.newGame}>Rejouer</button>
            </div>
            <Counter
              counter={this.trying()}
              gameState={this.state.gameState}
            />
          </div>
          <hr/>
          <div className="d-flex justify-content-center mb-5">
            { letters.map((letter, index) => (
              <Letter
                letter={letter}
                feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                key={index}
              />
            ))}
          </div>
          <div className="d-flex flex-wrap">
            { keyboards.map((letter, index) => (
              <Keyboard
                letter={letter}
                onClick={this.handleClick}
                feedback={this.getFeedback(letter) ? "secondary" : "primary"}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
