import { Question } from "./types";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface CategoryProps {
  id: number;
  name: string;
  questions: Question[];
  onAnswer: (
    categoryIndex: number,
    questionIndex: number,
    value: number
  ) => void;
}

export const CategoryForm = (props: CategoryProps) => {
  return (
    <div>
      <div className="title-form">
        <h2>{props.name}</h2>
      </div>
      {props.questions.map((question, index) => (
        <div key={index}>
          <h3>{question.text}</h3>
          <Slider
            min={0}
            max={10}
            value={question.answer}
            onChange={(e) => props.onAnswer(props.id, index, e as number)}
          />
        </div>
      ))}
    </div>
  );
};
