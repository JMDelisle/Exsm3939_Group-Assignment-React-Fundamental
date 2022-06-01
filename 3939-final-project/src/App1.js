import './App.css';
import './MemoryCards';
import { useState } from 'react';

const images = [
  {"src": "/img/" },
  {"src": "/img/"},
  {"src": "/img/"},
  {"src": "/img/"},
  {"src": "/img/"},
  {"src": "/img/"}
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
  
  return (
    <div className="App">
      <h1>Match Game</h1>
      <button onClick={shuffleCards}>Start New Game</button>

    </div>
  );
}

export default App;
