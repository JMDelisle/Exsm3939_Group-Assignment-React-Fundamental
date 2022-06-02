import './App.css';
import { useEffect, useState } from 'react';
import MemoryCard from './components/MemoryCard';
import Timer from './Timer';

const images = [
  { "src": "/img/audi.jpg", matched: false },
  { "src": "/img/bmw.jpg", matched: false },
  { "src": "/img/ferrari.jpg", matched: false },
  { "src": "/img/ford.jpg", matched: false },
  { "src": "/img/mercedes.jpg", matched: false },
  { "src": "/img/rangerover.jpg", matched: false },
  { "src": "/img/cool3 (1).jpg", matched: false },
  { "src": "/img/cool4 (1).jpg", matched: false }
]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [timerIdle, setTimerDisplay]= useSate(false);
  

  // shuffle cards
  const shuffleCards = () => {
    const shuffle = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffle);
    setTurns(0);
    setTimerDisplay(0);
   }

  setTimerDisplay()
  {
      timerIdle==true;

  }

  // Handle a choice.
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Compare two selected cards.
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
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
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // Reset choices & increase turn.
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, [])



  return (
    <div className="App">
      <h1>"Match My Ride" the Memory Game</h1>
      <button onClick={shuffleCards}>Start New Game</button>

      <div class="card-grid">
        {cards.map(card => (
          <MemoryCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div >
        <p>Turns: {turns}</p>
        <p>Time: <Timer /></p>
      </div> 
    </div>
  );
}

export default App;
