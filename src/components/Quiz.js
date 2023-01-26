import { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

//https://opentdb.com/api.php?amount=5&type=multiple

export default function QuestionBox(props) {
  const [questionBoxes, setQuestionBoxes] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${props.category}&difficulty=${props.difficulty}&type=multiple&encode=url3986`
    )
      .then((response) => response.json())
      .then((data) => {
        const newQuestions = [];
        const results = data.results;
        for (let i = 0; i < results.length; i++) {
          let optionsArray = [
            ...results[i].incorrect_answers,
            results[i].correct_answer,
          ].sort(() => (Math.random() > 0.5 ? 1 : -1));
          optionsArray = optionsArray.map((answer) => ({
            value: decodeURIComponent(answer),
            isChosen: false,
            isCorrect: answer === optionsArray.correct_answer ? true : false,
            isWrong: false,
            id: nanoid(),
          }));
          const questionBox = {
            question: decodeURIComponent(results[i].question),
            correct: decodeURIComponent(results[i].correct_answer),
            options: optionsArray,
            id: nanoid(),
          };
          newQuestions.push(questionBox);
        }
        setQuestionBoxes(newQuestions);
      });
  }, [props.category, props.difficulty]);

  function selectOption(optId, questId) {
    setQuestionBoxes((prevQuestionBox) => {
      return prevQuestionBox.map((questionBox) => {
        if (questionBox.id === questId) {
          const answers = questionBox.options.map((option) => {
            if (option.id === optId) {
              return { ...option, isChosen: !option.isChosen };
            }
            return { ...option, isChosen: false };
          });
          return { ...questionBox, options: answers };
        }

        return questionBox;
      });
    });
  }

  function checkAnswers() {
    const questionBoxCopy = [...questionBoxes];
    questionBoxCopy.map((copy) => {
      return copy.options.map((option) => {
        if (option.isChosen && option.value === copy.correct) {
          setScore((prevScore) => prevScore + 1);
        }
        if (option.value === copy.correct) {
          return (option.isCorrect = true);
        }
        if (option.isChosen && option.value !== copy.correct) {
          return (option.isWrong = true);
        }

        return { copy };
      });
    });
    setQuestionBoxes(questionBoxCopy);
    setChecked(true);
  }

  const questionElements = questionBoxes.map((questionBox) => {
    const { id, correct, question, options } = questionBox;
    return (
      <Question
        key={id}
        id={id}
        correct={correct}
        question={question}
        options={options}
        selectOption={selectOption}
        checked={checked}
      />
    );
  });

  return (
    <main>
      <div className="quiz-page">{questionElements}</div>
      <div>
        <button className="btn" onClick={checkAnswers}>
          Check answers
        </button>

        {checked && (
          <div className="play-again">
            <p className="result">
              You scored {score}/{questionBoxes.length} correct answers
            </p>
            <button className="btn" onClick={props.play}>
              Play again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
