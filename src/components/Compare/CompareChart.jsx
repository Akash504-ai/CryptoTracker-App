// components/Compare/CompareChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CompareChart = ({ coin1Data, coin2Data, labels, metric }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Coin 1",
        data: coin1Data,
        borderColor: "cyan",
        tension: 0.3,
      },
      {
        label: "Coin 2",
        data: coin2Data,
        borderColor: "orange",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
      },
      y: {
        ticks: { color: "white" },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CompareChart;
