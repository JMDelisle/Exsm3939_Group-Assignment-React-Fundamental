import './App.css';
import React, { useEffect, useState } from 'react';
import MemoryCard from './components/MemoryCard';
import Timer from './Timer';


const images = [
  { "src": "/img/audi.jpg", matched: false },
  { "src": "/img/bmw.jpg", matched: false },
  { "src": "/img/ferrari.jpg", matched: false },
  { "src": "/img/ford.jpg", matched: false },
  { "src": "/img/mercedes.jpg", matched: false },
  { "src": "/img/rangerover.jpg", matched: false },
  { "src": "/img/mercedes2.jpg", matched: false },
  { "src": "/img/mclaren.jpg", matched: false }
]
  

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameActive, setGameActive]= useState(false);    //This is to check boolean gameActive; is true, display timer/counter div.
  const [gameComplete, setGameComplete] = useState(false);
  const [pairCount, setPairCount] = useState(0);
  


  const refreshPage=()=>{

    window.location.reload();       //When the reload/reset button is pressed, reload the page to restart the game and the timer together.
    
  }

  // shuffle cards
  const shuffleCards = () => {
    const shuffle = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCardOne(null);
    setCardTwo(null);
    setCards(shuffle);
    setTurns(0);
    
   }
  // Handle a choice.
  const handleChoice = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  }

  // Compare two selected cards.
  useEffect(() => {
    
    if (cardOne && cardTwo) {
      setDisabled(true);

      if (cardOne.src === cardTwo.src) {
        setPairCount((pairCount) => {
         
          if (pairCount >= 1) {
            
            setGameComplete(true);
          }
          return pairCount+1;
        });
        
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {

        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [cardOne, cardTwo, pairCount])

  
  // Reset choices & increase turn.
  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);    
  }

  // Set focus on the "Start" button automatically when the page loads.
  useEffect(() => {
   
    window.document.getElementById("startButton").focus();
  }, [])

  return (
    <div className="App">
      <img src={require('../src/title.png')} alt= ''/>
       <h5>To start a game, click the "Start" button below. But beware, as soon as you click the button and the game starts, the timer starts too!</h5>
     <div className="flex">
        <button className="flex" id="startButton" onClick={() =>{shuffleCards();setGameActive(true);}}>Start New Game</button>
        <button className="flex" id="resetButton" onClick={refreshPage}>Reset/Reload</button>  
     </div>
    <div className="hidden" id="timerDisplay">
      <div className="card-grid" id="cards">
        {cards.map(card => (
          <MemoryCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === cardOne || card === cardTwo || card.matched}
            disabled={disabled}
          />
        ))}   
        </div>
        {gameActive ? <div className='flex'><div className='flex' id="timer" >Seconds: <Timer active={!gameComplete}/></div><p className='flex' id="turns" >Turns: {turns}</p> </div> : ""}  
      </div>
    </div>
  );
}

export default App;
