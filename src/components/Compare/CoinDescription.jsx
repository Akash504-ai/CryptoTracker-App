import React, { useEffect, useState } from "react";
import axios from "axios";

const CoinDescription = ({ id }) => {
  const [desc, setDesc] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchDesc = async () => {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setDesc(res.data.description.en);
      } catch (err) {
        console.error("Error fetching description:", err);
      }
    };
    fetchDesc();
  }, [id]);

  return (
    <div>
      <h3 style={{ color: "white", marginTop: "1rem" }}>Description:</h3>
      <p style={{ color: "#ccc", marginTop: "0.5rem" }}>
        {expanded ? desc : desc?.slice(0, 300) + "..."}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "#00bcd4",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
};

export default CoinDescription;
