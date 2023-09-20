import { useCallback, useEffect, useState } from "react";
import { Category } from "./types";

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
  ChartData,
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

interface RadarChartProps {
  categories: Category[] | null;
}

export const RadarChart = (props: RadarChartProps) => {
  const [chartData, setChartData] = useState<ChartData<"radar">>({
    labels: [],
    datasets: [
      {
        label: "Pessoal",
        data: [],
      },
    ],
  });
  function sumArray(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
  }

  const averageArray = useCallback((array: number[]) => {
    return sumArray(array) / array.length;
  }, []);

  useEffect(() => {
    if (!props.categories) return;
    const data = {
      labels: props.categories.map((category) => category.name),
      datasets: [
        {
          label: "Pessoal",
          data: props.categories.map((category) =>
            averageArray(category.questions.map((question) => question.answer))
          ),
          backgroundColor: "#af086c",
          borderColor: "#af086c",
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  }, [averageArray, props.categories]);

  return (
    <Radar
      data={chartData}
      options={{
        scales: {
          r: {
            max: 10,
            min: 0,
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
