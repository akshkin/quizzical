
export default function StartPage(props){
    
    return (
          <main>
            <div className="start-page">
                <h1 className="main-title">Quizzical</h1>
                <p className="main-subtitle">Time to test you general knowledge!</p>
                <button className="btn" onClick={props.play}>Start quiz</button> 

                <label htmlFor="category">Select category</label>
                <select id="category" name="category" value={props.category} onChange={(event) => props.setCategory(event.target.value)}>
                    <option value="9">General knowledge</option>
                    <option value="21">Sports</option>
                    <option value="26">Celebrities</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="18">Science: Computers</option>
                </select>
                <label htmlFor="difficulty">Difficulty level</label>
                <select id="difficulty" name="difficulty" value={props.difficulty} onChange={(event) => props.setDifficulty(event.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        </main>
    )
}