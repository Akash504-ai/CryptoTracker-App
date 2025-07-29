import React, { useState } from "react";
import "./style.css";

const CoinInfo = ({ heading, desc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayText = isExpanded ? desc : `${desc.slice(0, 210)}...`;

  return (
    <div className="grey-wrappeer">
      <h2 className="coin-info-heading">{heading}</h2>
      <p className="coin-info-desc">
        {displayText}
        {desc.length > 200 && (
          <span className="read-more" onClick={toggleReadMore}>
            {isExpanded ? " Read less" : " Read more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default CoinInfo;
