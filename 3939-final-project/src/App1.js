import './App.css';
import { useEffect, useState } from 'react';
import MemoryCard from './components/MemoryCard';

const images = [
  { "src": "/img/audi.jpg", matched: false },
  { "src": "/img/bmw.jpg", matched: false },
  { "src": "/img/ferrari.jpg", matched: false },
  { "src": "/img/ford.jpg", matched: false },
  { "src": "/img/mercedes.jpg", matched: false },
  { "src": "/img/rangerover.jpg", matched: false },
  { "src": "/img/mclaren.jpg", matched: false },
  { "src": "/img/mercedes2.jpg", matched: false }
]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

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
  }, [cardOne, cardTwo])

  console.log(cards)

  // Reset choices & increase turn.
  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
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
            flipped={card === cardOne || card === cardTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
