import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Budget Visualization",
    },
  },
};

const GoalChart = ({ goalData }) => {
  if (!goalData) {
    return <div>Loading.....</div>;
  }
  if (goalData.length === 0) {
    return <div>Enter some goal</div>;
  }
  const labels = goalData.map((goal) => goal.goalName);

  // Generate an array of random colors based on the number of bars
  const backgroundColors = Array.from(
    { length: goalData.length },
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Target Amount",
        data: goalData.map((goal) => goal.targetAmount),
        backgroundColor: backgroundColors,
      },
      {
        label: "Current Amount",
        data: goalData.map((goal) => goal.currentAmount),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default GoalChart;
