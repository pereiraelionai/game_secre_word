//css
import './App.css';

//react
import {useCallback, useEffect, useState} from 'react';

//data
import {wordsList} from './data/words';

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const states = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

function App() {

  const [gameStage, setGameStage] = useState(states[0].name);
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("");
  const [pikedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState([]);

  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category}
  }
  
  //starts the secret word game
  const StartGame = () => {
    const { word, category } = pickWordAndCategory();

    //creata an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(states[1].name);

  }

  //process letter input
  const verifyLetter = () => {
    setGameStage(states[2].name);
  }

  //retry
  const retry = () => {
    setGameStage(states[0].name);
  }


  return (
    <div className="App">
      <header className="App-header">
        {gameStage === 'start' && <StartScreen StartGame={StartGame}/>}
        {gameStage === 'game' && <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord} 
          pikedCategory={pikedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
        {gameStage === 'end' && <GameOver retry={retry}/>}
      </header>
    </div>
  );
}

export default App;
