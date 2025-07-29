import React, { useState } from "react";

const CoinDescription = ({ coin }) => {
  const [showMore, setShowMore] = useState(false);

  if (!coin?.description?.en) return null;

  const description = coin.description.en.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "20px",
        marginTop: "10px",
        borderRadius: "10px",
        fontWeight: "300",
        lineHeight: "1.6",
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>{coin.name}</h2>
      <p>
        {showMore ? description : description.slice(0, 300) + "... "}
        <span
          style={{ color: "#00bcd4", cursor: "pointer" }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Read less" : "Read more"}
        </span>
      </p>
    </div>
  );
};

export default CoinDescription;
