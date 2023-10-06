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

const BudgetChart = ({ budgetData }) => {
  if (!budgetData) {
    return <div>Loading.....</div>;
  }
  if (budgetData.length === 0) {
    return <div>Enter some budget</div>;
  }

  const labels = budgetData.map((budget) => budget.budgetname);

  // Generate an array of random colors based on the number of bars
  const backgroundColors = Array.from(
    { length: budgetData.length },
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Amount",
        data: budgetData.map((budget) => budget.totalamount),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BudgetChart;
