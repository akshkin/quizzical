import { useState } from "react";
import StartPage from "./components/StartPage";
import Quiz from "./components/Quiz";
import Blob from "./components/Blob";
import "./App.css";

function App() {
  const [playGame, setPlayGame] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  function play() {
    setPlayGame((prevPlayGame) => !prevPlayGame);
  }
  return (
    <main className="main">
      <Blob />
      {playGame ? (
        <Quiz difficulty={difficulty} category={category} play={play} />
      ) : (
        <StartPage
          setCategory={setCategory}
          setDifficulty={setDifficulty}
          play={play}
        />
      )}
    </main>
  );
}

export default App;
