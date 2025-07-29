import React, { useState } from "react";
import "./style.css";
import cryptoimg from "../../../assets/cryptoimg.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SharePopup from "../../Share/SharePopup"; // Adjust path if needed

const MainComponent = () => {
  const navigate = useNavigate(); 
  const [showPopup, setShowPopup] = useState(false);

  const handleDashboardClick = () => {
    navigate("/dashboard"); 
  };

  return (
    <>
      <div className="flex-info">
        <motion.div
          className="left-component"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="track-crypto-heading"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="stroked-text">Track</span>{" "}
            <span className="highlight">Crypto</span>{" "}
            <span className="stroked-text">Prices</span>
          </motion.h1>

          <motion.h1
            className="real-time-heading"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="stroked-text">Get</span>{" "}
            <span className="highlight">Real-Time</span>{" "}
            <span className="stroked-text">Updates</span>{" "}
            <span className="highlight">.</span>
          </motion.h1>

          <motion.p
            className="info-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Track cryptocurrency prices using a public API in real time. Visit the
            dashboard to explore more!
          </motion.p>

          <motion.div
            className="btn-flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button className="btn-solid" onClick={handleDashboardClick}>
              Dashboard
            </button>
            <button className="btn-outline" onClick={() => setShowPopup(true)}>
              Share
            </button>
          </motion.div>
        </motion.div>

        <div className="phone-container">
          <motion.img
            src={cryptoimg}
            alt="Crypto Illustration"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {showPopup && <SharePopup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default MainComponent;
