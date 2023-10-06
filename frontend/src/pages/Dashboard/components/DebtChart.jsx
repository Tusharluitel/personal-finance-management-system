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

const DebtChart = ({ debtData }) => {
  if (!debtData) {
    return <div>Loading.....</div>;
  }
  if (debtData.length === 0) {
    return <div>Enter some debt</div>;
  }

  const labels = debtData.map((debt) => debt.creditor);

  // Generate an array of random colors based on the number of bars
  const backgroundColors = Array.from(
    { length: debtData.length },
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
        data: debtData.map((debt) => debt.balance),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default DebtChart;
