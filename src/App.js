import { useState } from "react"
import StartPage from "./components/StartPage"
import Quiz from "./components/Quiz"
import Blob from "./components/Blob"
import './App.css';

function App() {
  const [playGame, setPlayGame] = useState(false)

  function play(){
      setPlayGame(prevPlayGame => !prevPlayGame)
  }
  return (
    <main className="main">
        <Blob />
        {!playGame && <StartPage play={play}/>}
        {playGame && <Quiz play={play}/>}
    </main>
   
  );
}

export default App;
