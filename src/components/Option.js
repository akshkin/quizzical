
export default function Option(props){
    let styles={}

    if(props.option.isChosen && !props.checked){
        //selected style
        styles = {
            backgroundColor: "#D6DBF5",
            border: "none"
        }
    }
    else if(props.option.isCorrect || props.option.isChosen === props.correct){
        styles={
            backgroundColor: "#94D7A2",
            border: "none"
        }
    } else if(props.option.isWrong){
        styles={
            backgroundColor: "#F8BCBC",
            border: "none",
            opacity: "0.5"
        }

    } else if(props.checked){
        styles={
            backgroundColor: "#FFFFFF",
            border: "1px solid #4D5B9E",
            opacity: "0.5"
        }
    }
    
    return (
        <span 
            className="answer" 
            style={styles}
            onClick={()=>props.selectOption(props.option.id, props.questId)}
        >
            {props.option.value}
        </span>
    )
}