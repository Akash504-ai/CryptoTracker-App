import React from "react";
import "./style.css";
import TemporaryDrawer from "./drawer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.div
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="logo">
        CryptoTracker <span style={{ color: "var(--green)" }}>.</span>
      </h1>

      <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/compare" className="link">Compare</Link>
        <Link to="/watchlist" className="link">Watchlist</Link>
        <Link to="/dashboard" className="dashboard-btn">Dashboard</Link>
      </div>

      <div className="mobile-drawer">
        <TemporaryDrawer />
      </div>
    </motion.div>
  );
};

export default Navbar;
