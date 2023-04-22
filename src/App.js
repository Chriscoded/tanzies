import logo from './logo.svg';
import './App.css';
import Die from './components/Die';
import React from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tanzies, setTanzies] = React.useState(false);
  
  React.useEffect(() => {
    //Check if all dies is held and store the boolean value in allHead variable
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    //If its all hels and the values are the sam you won
    if(allHeld && firstValue){
      setTanzies(true);
      // console.log("You won");
    }
  }, [dice]);

  function allNewDice(){
    var minm = 1;
    var maxm = 6;
    var i = 0;
    var dice = [];
    for(i; i < 10; i++){
      //let create an array of objects for with all the dices
      dice.push(generateNewDie())
    }
    return dice;
    
  }

  function generateNewDie(){
    // var die = []
    var minm = 1;
    var maxm = 6;
    
      return {
        value:Math.floor(Math.random() * (maxm - minm + 1)) + minm, 
        isHeld: false,
        id: nanoid()
      }
      
  }
    
  

  // console.log(oneNewDice());
  function rollDice(){
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld === false ? generateNewDie() : die
    }))
  }

    function holdDice(id){
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld : !die.isHeld} : die
      }))
    }

    function newGame(){
      setDice(allNewDice());
      setTanzies(false);
      return
    }
  // console.log(dice);

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    ));
  return (
      <main>
        {tanzies && <Confetti/>}
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
  
        <button 
          className='roll-dice-btn' 
          onClick={tanzies ? newGame : rollDice}
        >
          {tanzies ? "New Game": "Roll"}</button> :  
       
      </main>
  );
}

export default App;
