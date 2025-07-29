import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./style.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { red, green } from "@mui/material/colors";
import { Link } from "react-router-dom";

const gridVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

const Grid = ({ coin, onStarToggle }) => {
  const isProfit = coin.price_change_percentage_24h >= 0;
  const [starred, setStarred] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const found = watchlist.some((item) => item.id === coin.id);
    setStarred(found);
  }, [coin.id]);

  const toggleStar = (e) => {
    e.preventDefault(); // prevent Link navigation

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!starred) {
      watchlist.push(coin);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert(`${coin.name} added to Watchlist`);
    } else {
      watchlist = watchlist.filter((item) => item.id !== coin.id);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert(`${coin.name} removed from Watchlist`);
      if (onStarToggle) onStarToggle(coin.id); // 🔥 notify parent to remove this card
    }

    setStarred((prev) => !prev);
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <motion.div
        className="grid-container"
        variants={gridVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          borderColor: isProfit ? "rgb(109, 154, 42)" : "rgb(200, 60, 60)",
          borderStyle: "solid",
          borderWidth: "2px",
          position: "relative",
          backgroundColor: "#1c1c1c",
          color: "#e0ffe0",
          borderRadius: "12px",
          padding: "1rem",
          width: "280px",
        }}
      >
        {/* ⭐ Star Icon on the right */}
        <div
          className="star-icon-wrapper"
          onClick={toggleStar}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
        >
          {starred ? (
            <StarRoundedIcon className="star-icon filled" style={{ color: "#ffd700" }} />
          ) : (
            <StarBorderRoundedIcon className="star-icon" style={{ color: "#ccc" }} />
          )}
        </div>

        <div className="info-flex" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <motion.img
            src={coin.image}
            alt={coin.name}
            className="coin-logo"
            style={{ width: "40px", height: "40px" }}
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <div className="info">
            <div className="name-col">
              <p className="coin-symbol" style={{ fontWeight: "bold" }}>
                {coin.symbol.toUpperCase()}
              </p>
              <p className="coin-name">{coin.name}</p>
            </div>
          </div>
        </div>

        <div className="chip-flex" style={{ display: "flex", alignItems: "center", marginTop: "10px", gap: "0.5rem" }}>
          <div className={`price-chip ${!isProfit ? "chip-red" : ""}`}>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className={`price-chip icon-chip ${!isProfit ? "chip-red" : ""}`}>
            {isProfit ? (
              <TrendingUpRoundedIcon style={{ color: green[500] }} />
            ) : (
              <TrendingDownRoundedIcon style={{ color: red[500] }} />
            )}
          </div>
        </div>

        <div className="info-container" style={{ marginTop: "1rem" }}>
          <h3 className={`coin-price ${isProfit ? "green-text" : "red-text"}`} style={{ marginBottom: "0.5rem" }}>
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total_volume1">Total Volume: {coin.total_volume?.toLocaleString() || "N/A"}</p>
          <p className="total_volume2">Market Cap: ${coin.market_cap?.toLocaleString() || "N/A"}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Grid;
