import React from "react";
import "./sharePopuo.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
  RedditIcon,
} from "react-share";

const SharePopup = ({ onClose }) => {
  const link = "http://localhost:5173/";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Share this Page</h3>
        <p>Click below to copy the link or share on:</p>

        <div className="icon-container">
          <FacebookShareButton url={link}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={link}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <WhatsappShareButton url={link}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={link}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <TelegramShareButton url={link}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>

          <RedditShareButton url={link}>
            <RedditIcon size={40} round />
          </RedditShareButton>
        </div>

        <input type="text" readOnly value={link} className="share-link" />
        <div className="button-group">
          <button className="copy-btn" onClick={handleCopy}>
            Copy Link
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
