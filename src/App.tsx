import "./App.css";

import React from "react";
import { Category, defaultValue } from "./types";
import { RadarChart } from "./Chart";
import { CategoryForm } from "./Category";
import BrunaReisLogo from "./assets/BrunaReisLogo.svg";

function App() {
  const [categories, setCategories] = React.useState<Category[] | null>(
    defaultValue
  );

  const [currentCategory, setCurrentCategory] = React.useState<number>(0);

  function setAnswer(
    categoryIndex: number,
    questionIndex: number,
    value: number
  ) {
    const newCategories = [...categories!];
    newCategories[categoryIndex].questions[questionIndex].answer = value;
    setCategories(newCategories);
  }

  function next() {
    if (currentCategory === categories!.length - 1) return;
    setCurrentCategory(currentCategory + 1);
  }

  function previous() {
    if (currentCategory === 0) return;
    setCurrentCategory(currentCategory - 1);
  }

  return (
    <>
      <div id="app">
        <img className="logo" src={BrunaReisLogo} alt="Bruna Reis Logo" />

        <RadarChart categories={categories} />

        {categories?.map((category, index) => (
          <div
            style={{ display: index === currentCategory ? "block" : "none" }}
            key={index}
          >
            <CategoryForm
              id={index}
              name={category.name}
              questions={category.questions}
              onAnswer={setAnswer}
            />
          </div>
        ))}
        <div className="control-buttons">
          <button disabled={currentCategory === 0} onClick={previous}>
            Anterior
          </button>
          <button
            disabled={currentCategory === categories!.length - 1}
            onClick={next}
          >
            Próxima
          </button>
        </div>
      </div>
      <div style={{fontSize: "small", marginTop: "4em"}}>
        <hr />
        Luiz Paulo Lindenmaier @ 2023
      </div>
    </>
  );
}

export default App;
