import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Grid from "../components/Dashboard/Grid";
import { useNavigate } from "react-router-dom";

const WatchlistPage = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    const data = JSON.parse(localStorage.getItem("watchlist")) || [];
    const filteredData = data.filter((coin) => coin && coin.id);
    setWatchlistData(filteredData);
  };

  const handleStarToggle = (coinId) => {
    const updatedList = watchlistData.filter((coin) => coin.id !== coinId);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
    setWatchlistData(updatedList); // instantly update UI
  };

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
      <Header />

      {/* Watchlist Coins */}
      {watchlistData.length > 0 ? (
        <div
          className="grid-flex"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            padding: "1rem",
            justifyContent: "center",
          }}
        >
          {watchlistData.map((coin) => (
            <Grid key={coin.id} coin={coin} onStarToggle={handleStarToggle} />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            textAlign: "center",
            color: "gray",
          }}
        >
          <h2>Your Watchlist</h2>
          <p>No coins in your watchlist.</p>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "#2a2a2a",
              color: "white",
              border: "1px solid #444",
              borderRadius: "6px",
              padding: "0.6rem 1.2rem",
              marginTop: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2a2a2a")}
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
