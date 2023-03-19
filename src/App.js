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

  const guessesQt = 3;

  const [gameStage, setGameStage] = useState(states[0].name);
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("");
  const [pikedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQt);
  const [score, setScore] = useState([]);

  const pickWordAndCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category}
  }, [words]);
  
  //starts the secret word game
  const StartGame = useCallback(() => {
    //clear all letters
    clearLetterStates();

    const { word, category } = pickWordAndCategory();

    //creata an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(states[1].name);

  }, [pickWordAndCategory]);

  //process letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    //check if letter has alredy been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    //push guessed letter or remove guess
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)

    }

  }

  function clearLetterStates() {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check guess ended
  useEffect(() => {

    if(guesses === 0) {
      //reset all states
      clearLetterStates()

      setGameStage(states[2].name)
    }

  }, [guesses]);

  //check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    //win condition
    if(guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => (actualScore += 100))

      //restart game with new word
      StartGame();
    }

  }, [guessedLetters, letters, StartGame]);

  //retry
  const retry = () => {
    setScore(0);
    setGuesses(guessesQt);

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
        {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
      </header>
    </div>
  );
}

export default App;
