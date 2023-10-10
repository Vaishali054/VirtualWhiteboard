import React, {useState} from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChevronDown,
  faShare,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

  export default function Navbar() {
  const [shareLink, setShareLink] = useState(null);

  const generateShareLink = () => {
    // Generate the current URL to share
    const currentURL = window.location.href;
    setShareLink(currentURL);
  };

  const handleShareClick = async () => {
    if (!shareLink) {
      // generate share link if not already generated
      generateShareLink();
    }

    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying link to clipboard:", error);
      }
    }
  };
  return (
    <>
      <nav>
        <div className="container1">
          <div className="home">
          <FontAwesomeIcon icon={faHouse} style={{ color: "#313539" }}  size="1x" />
          </div>
          <div className="line">|</div>
          <div className="slideName">Untitled whiteboard</div>
          <div className="down">
          <FontAwesomeIcon icon={faChevronDown} style={{ color: "#313539" }} />
          </div>
        </div>

        <div className="container2">

          <div className="button" onClick={handleShareClick}>
            <FontAwesomeIcon icon={faShare} style={{ color: "#313539" }} />Share

          </div>
          <div className="setting">
          <FontAwesomeIcon icon={faGear} style={{ color: "#313539" }} />
          </div>
        </div>
      </nav>
    </>
  );
}
