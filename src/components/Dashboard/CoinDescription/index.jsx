import React, { useState } from "react";

const CoinDescription = ({ coin }) => {
  const [showMore, setShowMore] = useState(false);

  if (!coin?.description?.en) return null;

  const description = coin.description.en.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div
      style={{
        width: "100%", // full width of the container
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "20px",
        marginTop: "10px",
        borderRadius: "10px",
        fontWeight: "300",
        lineHeight: "1.6",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          marginBottom: "10px",
          fontWeight: "500",
          color: "#f0f0f0",
        }}
      >
        {coin.name}
      </h2>
      <p style={{ fontSize: "0.90rem" }}>
        {showMore ? description : description.slice(0, 300) + "... "}
        <span
          style={{
            color: "#00bcd4",
            cursor: "pointer",
            fontWeight: "500",
          }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Read less" : "Read more"}
        </span>
      </p>
    </div>
  );
};

export default CoinDescription;
