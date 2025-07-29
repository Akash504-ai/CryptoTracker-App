import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { coinObject } from "../functions/convertObject";
import axios from "axios";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/gerCoinPrices";
import LineChart from "../components/Coin/LineChart";

const CoinPage = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, days]);

  async function getData() {
    setLoading(true);
    const coinData = await getCoinData(id);
    if (coinData) {
      coinObject(setCoinData, coinData);
      const prices = await getCoinPrices(id, days);
      if (prices.length > 0) {
        const labels = prices.map(p => {
          const date = new Date(p[0]);
          return days === 1 ? `${date.getHours()}:00` : date.toLocaleDateString();
        });

        const data = prices.map(p => p[1]);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `${coinData.name} Price (INR)`,
              data: data,
              borderColor: "#39FF14",
              backgroundColor: "transparent",
              tension: 0.2,
            },
          ],
        });

        setLoading(false);
      }
    }
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coinData} />
          </div>

          <div className="greyy-wrapper">
            <LineChart chartData={chartData} />
          </div>

          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
};

export default CoinPage;
