import "./StartScreen.css";

const StartScreen = ({StartGame}) => {
  return (
    <div className="start">
        <h1>Secret word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={StartGame}>Comerçar o jogo</button>
    </div>
  )
}

export default StartScreen