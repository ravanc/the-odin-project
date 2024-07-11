import { useState, useEffect } from 'react'
import CARDS from './cards';
import './App.css'

const endPoint = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentSelection, setSelection] = useState([]);
  const [cardArray, setCardArray] = useState([]);

  const fetchCards = () => {
    const responses = CARDS.map((pokemon) => fetch(endPoint + pokemon, {mode: "cors"}));
    Promise.all(responses)
    .then(result => Promise.all(result.map(r => r.json())))
    .then(result => {
      setCardArray(shuffle(result));
    })  
  }

  useEffect(() => {
    fetchCards();
  }, [])

  function onClick(name) {
    if (currentSelection.includes(name)) {
      if (currentScore > highScore) {
        setHighScore(currentScore);
      }
      setCurrentScore(0);
      setSelection([]);
    } else {
      let newSelection = [...currentSelection, name];
      setSelection(newSelection);
      setCurrentScore(currentScore + 1);
    }
    setCardArray(shuffle(cardArray));
  };

  return (
    <div className="container">
      <h1>Pokemon Card Memory Game</h1>
      <div className="scores">
        <p>Current Score: { currentScore }</p>
        <p>High Score: { highScore }</p>
      </div>
      <div className="cards-container">
      {
        cardArray.map((card) => {
          return <Card key={card.name} name={ card.name } source={ card.sprites.front_default } onClick={() => onClick(card.name)} ></Card>
        })
      }
      </div>
    </div>
  );
}

function Card({ name, source, onClick }) {
  return (
    <div className='card' onClick={onClick}>
      <img src={ source } className='card-image'/>
      <p className='card-name'>{ name.toUpperCase() }</p>
    </div>
  );};


function shuffle(array) {
  console.log("Array", array)
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  
  return array;
}

export default App
