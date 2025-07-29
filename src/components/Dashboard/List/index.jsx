import React, { useEffect, useState } from "react";
import "./style.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Index({ coin }) {
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const found = watchlist.some((item) => item.id === coin.id);
    setIsInWatchlist(found);
  }, [coin.id]);

  const handleRowClick = () => {
    navigate(`/coin/${coin.id}`);
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!isInWatchlist) {
      watchlist.push(coin);
      alert(`${coin.name} added to Watchlist`);
      setIsInWatchlist(true);
    } else {
      watchlist = watchlist.filter((item) => item.id !== coin.id);
      alert(`${coin.name} removed from Watchlist`);
      setIsInWatchlist(false);
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };

  return (
    <motion.div
      className="list-row"
      onClick={handleRowClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="list-content-wrapper">
        <div>
          <img src={coin.image} alt={coin.name} className="coin-logo" />
        </div>

        <div>
          <div className="name-coll">
            <p className="coin-id">{coin.id}</p>
            <p className="coin-symbol">{coin.symbol}</p>
          </div>
        </div>

        <div className="chip-flexx">
          {coin?.price_change_percentage_24h > 0 ? (
            <>
              <div className="price-chip">
                {coin?.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="price-chip icon-chip">
                <TrendingUpRoundedIcon />
              </div>
            </>
          ) : (
            <>
              <div className="price-chip chip-red">
                {coin?.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="price-chip icon-chip chip-red">
                <TrendingDownRoundedIcon />
              </div>
            </>
          )}
        </div>

        <div>
          <h3
            className={`coin-pricee ${
              coin.price_change_percentage_24h < 0 ? "red-text" : "green-text"
            }`}
          >
            ${coin?.current_price?.toLocaleString() || "N/A"}
          </h3>
        </div>

        <div>
          <p className="total_volume11">
            Total Volume: {coin?.total_volume?.toLocaleString() || "N/A"}
          </p>
          <p className="total_volume22">
            Market Cap: ${coin?.market_cap?.toLocaleString() || "N/A"}
          </p>
        </div>

        {/* ⭐ Star on right side */}
        <div onClick={handleStarClick} className="star-wrapper" style={{ cursor: "pointer" }}>
          {isInWatchlist ? (
            <StarIcon className="star-icon filled" />
          ) : (
            <StarBorderIcon className="star-icon" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Index;
