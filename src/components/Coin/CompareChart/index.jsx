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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const colors = ["#00ffcc", "#ff4d4d"];

const CompareChart = ({ coinIds = [], days = 30, currency = "inr", metric = "prices" }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const responses = await Promise.all(
        coinIds.map((id) =>
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
          )
        )
      );

      const labels = responses[0].data[metric].map((point) => {
        const date = new Date(point[0]);
        return days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString();
      });

      const datasets = responses.map((res, index) => {
        const values = res.data[metric].map((point) => point[1]);
        return {
          label: coinIds[index],
          data: values,
          fill: false,
          borderColor: colors[index],
          backgroundColor: colors[index],
          tension: 0.3,
          pointRadius: 0,
        };
      });

      setChartData({ labels, datasets });
    } catch (err) {
      console.error("Error fetching comparison chart data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coinIds.length === 2) {
      fetchChartData();
    }
  }, [coinIds, days, metric]);

  if (!coinIds.length || coinIds.length !== 2) return null;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1e1e1e",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 0 12px rgba(0, 255, 255, 0.15)",
        color: "#fff",
        marginTop: "40px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Comparison Chart
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading comparison chart...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "#fff",
                },
              },
            },
            scales: {
              x: {
                ticks: { color: "#888" },
              },
              y: {
                ticks: { color: "#888" },
              },
            },
          }}
          height={400}
        />
      )}
    </div>
  );
};

export default CompareChart;
