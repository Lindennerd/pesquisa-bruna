import { ChartData } from "chart.js";
import { Category } from "./types";
import { useCallback, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Colors,
  CategoryScale
);

ChartJS.defaults.color = "#fff";
ChartJS.defaults.borderColor = "#ffffff";

const defaultData: ChartData<"radar"> = {
    labels: [],
    datasets: []
}

export const Chart = ({ categories }: { categories: Category[] | null}) => {
  const [chartData, setChartData] = useState<ChartData<"radar">>(defaultData);

  function sumArray(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
  }

  const averageArray = useCallback((array: number[]) => {
    return sumArray(array) / array.length;
  }, []);

  useEffect(() => {
    if (!categories) return;
    const data = {
      labels: categories.map((category) => category.name),
      datasets: [
        {
          label: "Pessoal",
          data: categories.map((category) =>
            averageArray(category.questions.map((question) => question.answer))
          ),
          backgroundColor: "#af086c",
          borderColor: "#af086c",
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  }, [averageArray, categories]);
  if(!categories) return (<></>)
  return (
    <Radar
      data={chartData}
      options={{
        scales: {
          r: {
            grid: {
              color: "#fff",
            },
            ticks: {
              color: "#fff",
              backdropColor: "#615a8c85",
            },
          },
        },
      }}
    />
  );
};
