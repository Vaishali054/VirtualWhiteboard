import React from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChevronDown,
  faShare,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="container1">
          <div className="home">
          <FontAwesomeIcon icon={faHouse} style={{color: "#18191b",}} size="1x" />
          </div>
          <div className="line">|</div>
          <div className="slideName">Untitled whiteboard</div>
          <div className="down">
          <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        <div className="container2">
          <div className="button">
            <FontAwesomeIcon icon={faShare} />Share
          </div>
          <div className="setting">
          <FontAwesomeIcon icon={faGear} />
          </div>
        </div>
      </nav>
    </>
  );
}
