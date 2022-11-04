import { useState } from "react"
import StartPage from "./components/StartPage"
import Quiz from "./components/Quiz"
import Blob from "./components/Blob"
import './App.css';

function App() {
  const [playGame, setPlayGame] = useState(false)
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("easy")

  // function handleChange(event){
  //   const {name, value} = event.target
  //   setCategory(prevCategory => ({...prevCategory, [name]: value}))
  //   setDifficulty(prevDifficulty => ({...prevDifficulty, [name]: value}))
  // }
  
    console.log(category)
    console.log(difficulty)
  function play(){
      setPlayGame(prevPlayGame => !prevPlayGame)
  }
  return (
    <main className="main">
        <Blob />
        {!playGame && <StartPage setCategory={setCategory} setDifficulty={setDifficulty} play={play}/>}
        {playGame && <Quiz difficulty={difficulty} category={category} play={play}/>}
    </main>
   
  );
}

export default App;
