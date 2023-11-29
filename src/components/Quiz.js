import { useState, useEffect } from "react";
import Question from "./Question";
import { ReactComponent as Loader } from "../assets/loading.svg";
import { nanoid } from "nanoid";

export default function QuestionBox({ play, difficulty, category }) {
  const [isLoading, setIsLoading] = useState(false);
  const [questionBoxes, setQuestionBoxes] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`
        );
        const data = await response.json();

        const results = data.results;

        // form answers array
        const result = results.map((item) => {
          const incorrectAnswers = item.incorrect_answers.map((answer) => ({
            option: decodeURIComponent(answer),
            isCorrect: false,
            id: nanoid(),
            isChosen: false,
          }));
          const answers = [
            {
              option: decodeURIComponent(item.correct_answer),
              isCorrect: true,
              id: nanoid(),
              isChosen: false,
            },
            ...incorrectAnswers,
          ].sort(() => (Math.random() > 0.5 ? 1 : -1));

          // questionBox object with question and answers
          return {
            id: nanoid(),
            question: decodeURIComponent(item.question),
            answers,
            correctAnswer: item.correct_answer,
          };
        });
        setQuestionBoxes(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, [category, difficulty]);

  // check answers
  function checkAnswers() {
    setQuestionBoxes((prevQuestionBoxes) => {
      let newScore = 0;

      const updatedQuestionBoxes = prevQuestionBoxes.map((item) => {
        const updatedAnswers = item.answers.map((answer) => {
          if (answer.isChosen && answer.isCorrect) {
            newScore += 1;
          }

          return answer;
        });

        return {
          ...item,
          answers: updatedAnswers,
        };
      });

      setScore(newScore);
      setChecked(true);

      return updatedQuestionBoxes;
    });
  }

  return (
    <main className="quiz-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {questionBoxes.length &&
            questionBoxes.map((item) => (
              <Question
                key={item.id}
                question={item.question}
                options={item.answers}
                setQuestionBoxes={setQuestionBoxes}
                checked={checked}
              />
            ))}
          <button disabled={checked} className="btn" onClick={checkAnswers}>
            Check answers
          </button>
          {checked && (
            <div className="play-again">
              <p className="result">
                You scored {score}/{questionBoxes.length} correct answers
              </p>
              <button className="btn" onClick={play}>
                Play again
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
