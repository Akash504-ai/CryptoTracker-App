import React, { useState, useEffect } from "react";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";
import "./style.css";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 20) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="back-to-top-btn"
      onClick={scrollToTop}
      style={{ display: visible ? "flex" : "none" }}
    >
      <VerticalAlignTopRoundedIcon
        style={{ color: "#adff2f", fontSize: "2rem" }}
      />
    </div>
  );
};

export default BackToTop;
