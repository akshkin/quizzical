import Option from "./Option";
import { nanoid } from "nanoid";

export default function Question(props) {
  const { id, checked, selectOption } = props;
  const optionsElements = props.options.map((option) => {
    return (
      <Option
        key={nanoid()}
        questId={id}
        checked={checked}
        selectOption={selectOption}
        option={option}
      />
    );
  });

  return (
    <div className="question-box">
      <h3 className="question">{props.question}</h3>
      <div className="answers">{optionsElements}</div>
    </div>
  );
}
