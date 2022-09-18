
export default function StartPage(props){
    return (
          <main>
            <div className="start-page">
                <h1 className="main-title">Quizzical</h1>
                <p className="main-subtitle">Some description if needed</p>
                <button className="btn" onClick={props.play}>Start quiz</button> 
            </div>
        </main>
    )
}