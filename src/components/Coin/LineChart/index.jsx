import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
);

const ChartComponent = ({ id = "bitcoin", currency = "inr" }) => {
  const [chartData, setChartData] = useState({});
  const [days, setDays] = useState(1);
  const [metric, setMetric] = useState("prices");
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
      const { data } = await axios.get(url);

      const selectedData = data[metric];
      const labels = selectedData.map((point) => {
        const date = new Date(point[0]);
        return days === 1
          ? date.toLocaleTimeString()
          : date.toLocaleDateString();
      });

      const values = selectedData.map((point) => point[1]);

      setChartData({
        labels,
        datasets: [
          {
            label:
              metric === "prices"
                ? `Price (past ${days} day${days > 1 ? "s" : ""})`
                : metric === "market_caps"
                ? `Market Cap`
                : `Total Volume`,
            data: values,
            fill: true,
            backgroundColor: (context) => {
              const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, "rgba(72, 239, 131, 0.4)");
              gradient.addColorStop(1, "rgba(28, 28, 28, 0.1)");
              return gradient;
            },
            borderColor: "#48ef83", // soft modern green
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [days, metric]);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1c1c1c",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(0, 255, 0, 0.08)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px", fontWeight: 600 }}>
        {id.toUpperCase()} Performance Chart
      </h2>

      {/* Controls Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Time Range Buttons */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: "#aaa", fontWeight: "bold" }}>Time Range:</span>
          {[{ label: "1D", value: 1 }, { label: "7D", value: 7 }, { label: "30D", value: 30 }, { label: "1Y", value: 365 }].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setDays(btn.value)}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: days === btn.value ? "#48ef83" : "#292929",
                color: days === btn.value ? "#000" : "#eee",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Metric Selector */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: "#aaa", fontWeight: "bold" }}>Metric:</span>
          {[{ key: "prices", label: "Price" }, { key: "market_caps", label: "Market Cap" }, { key: "total_volumes", label: "Volume" }].map((item) => (
            <button
              key={item.key}
              onClick={() => setMetric(item.key)}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: metric === item.key ? "#48ef83" : "#292929",
                color: metric === item.key ? "#000" : "#eee",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "#999" }}>Loading Chart...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#333",
                titleColor: "#48ef83",
                bodyColor: "#fff",
                borderColor: "#48ef83",
                borderWidth: 1,
              },
            },
            scales: {
              x: {
                ticks: { color: "#aaa" },
                grid: { color: "rgba(255, 255, 255, 0.05)" },
              },
              y: {
                ticks: { color: "#aaa" },
                grid: { color: "rgba(255, 255, 255, 0.05)" },
              },
            },
          }}
          style={{ height: "500px", maxHeight: "600px" }}
        />
      )}
    </div>
  );
};

export default ChartComponent;
