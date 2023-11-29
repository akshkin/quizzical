import Option from "./Option";

export default function Question({
  question,
  options,
  setQuestionBoxes,
  checked,
}) {
  // set isChosen property if selected by user
  function setChosen(optionId) {
    setQuestionBoxes((prevQuestions) =>
      prevQuestions.map((item) => {
        return item.question === question
          ? {
              ...item,
              answers: item.answers.map((answer) => {
                return answer.id === optionId
                  ? { ...answer, isChosen: true }
                  : { ...answer, isChosen: false };
              }),
            }
          : item;
      })
    );
  }

  return (
    <div className="question-box">
      <h3 className="question">{question}</h3>
      <div className="answers">
        {options.map((option) => {
          return (
            <Option
              key={option.id}
              setChosen={setChosen}
              id={option.id}
              checked={checked}
              option={option}
            />
          );
        })}
      </div>
    </div>
  );
}
