import React, { useEffect, useState } from "react";
import axios from "axios";
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartComponent = ({ coinId, days = 30, type = "prices" }) => {
  const [chartData, setChartData] = useState({});

  const fetchChartData = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: days,
          },
        }
      );

      const labels = res.data[type].map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      const data = res.data[type].map((item) => item[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: `${type} (last ${days} days)`,
            data,
            borderColor: "#4fa3ff",
            backgroundColor: "rgba(79, 163, 255, 0.2)",
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      });
    } catch (err) {
      console.error("Chart data error", err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [coinId, days, type]);

  return (
    <div style={{ backgroundColor: "#1a1a1a", padding: "1rem", borderRadius: "10px" }}>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
