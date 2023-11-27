export default function Option({ setChosen, id, option, checked }) {
  let styles = {};

  const { isChosen, isCorrect } = option;

  switch (true) {
    case isChosen && !checked:
      styles = {
        backgroundColor: "#D6DBF5",
        border: "none",
      };
      break;
    case isChosen && checked && isCorrect:
      styles = {
        backgroundColor: "#94D7A2",
        border: "none",
      };
      break;
    case isChosen && checked && !isCorrect:
      styles = {
        backgroundColor: "#F8BCBC",
        border: "none",
        opacity: "0.5",
      };
      break;
    case checked && isCorrect:
      styles = {
        backgroundColor: "#94D7A2",
        border: "none",
        opacity: "0.5",
      };
      break;
    case checked:
      styles = {
        backgroundColor: "#FFFFFF",
        border: "1px solid #4D5B9E",
        opacity: "0.5",
      };
      break;
    case checked && isCorrect:
      styles = {
        backgroundColor: "#94D7A2",
        border: "none",
      };
      break;
  }

  return (
    <span className="answer" style={styles} onClick={() => setChosen(id)}>
      {option.option}
    </span>
  );
}
