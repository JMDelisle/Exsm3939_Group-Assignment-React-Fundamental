import './App.css';
import './MemoryCards';
import { useState } from 'react';

const images = [
  {"src": "/img/catsmiling.jpg" },
  {"src": "/img/cooldog.jpg"},
  {"src": "/img/dogsmiling.jpg"},
  {"src": "/img/hellothere.jpg"},
  {"src": "/img/monkeybananas.jpg"},
  {"src": "/img/oneeyemonkey.jpg"}
]


function App() {
 const [cards, setCards] = useState([])
 const [turns, setTurns] = useState(0)
  // shuffle cards
  const shuffleCards =() => {
    const shuffle = [...images, ...images]
    .sort(() => Math.random() -0.5)
    .map((card) => ({ ...card, id: Math.random()}))

    setCards(shuffle)
    setTurns(0)
  }
  console.log(cards, turns)
  return (
    <div className="App">
      <h1>Match Game</h1>
      <button onClick={shuffleCards}>Start New Game</button>

      <div class="card-grid">
        {cards.map(card =>(
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front"/>
              <img className="back" src="/img/trollface2.jpg" alt="card back"/>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
