import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const images = [
  { "src": "/img/audi.jpg", matched: false },
  { "src": "/img/bmw.jpg", matched: false },
  { "src": "/img/ferrari.jpg", matched: false },
  { "src": "/img/ford.jpg", matched: false },
  { "src": "/img/mercedes.jpg", matched: false },
  { "src": "/img/rangerover.jpg", matched: false }
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)


  // shuffle cards
  const shuffleCards = () => {
    const shuffle = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffle)
    setTurns(0)
  }

  // Handle a choice.
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare two selected cards.
  useEffect(() => {
    if (choiceOne && choiceTwo) {

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
        resetTurn()
      } else {

        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // Reset choices & increase turn.
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>"Match My Ride" the Memory Game</h1>
      <button onClick={shuffleCards}>Start New Game</button>

      <div class="card-grid">
        {cards.map(card => (
            <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} />
        ))}
      </div>
    </div>
  );
}

export default App;
