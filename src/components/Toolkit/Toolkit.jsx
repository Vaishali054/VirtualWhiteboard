import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./toolkit.css";
import {
  faDownload,
  faEllipsis,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faNoteSticky,
  faPen,
  faShapes,
  faT,
} from "@fortawesome/free-solid-svg-icons";

export default function Toolkit() {
  return (
    <div className="container-bottom">
      <div className="toolkit">
        <div className="shift-down">
          <div className="zoom shadow button">
            <div className="plus">
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </div>
            <div className="percent"> 100%</div>
            <div className="minus">
              <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
            </div>
          </div>
        </div>
        <div className="tools shadow">
          <div className="pens">
            <FontAwesomeIcon icon={faPen} size="2x" />
          </div>
          <div className="stickynotes">
            <FontAwesomeIcon
              icon={faNoteSticky}
              style={{ color: "#c4d56c" }}
              size="2x"
            />
          </div>
          <div className="text">
            <FontAwesomeIcon icon={faT} size="2x" />
          </div>
          <div className="shapes">
            <FontAwesomeIcon icon={faShapes} size="2x" />
          </div>
          <div className="more">
            <FontAwesomeIcon icon={faEllipsis} size="2x" />
          </div>
        </div>
        <div className=" button download shadow">
          Download
          <FontAwesomeIcon icon={faDownload} />
        </div>
      </div>
    </div>
  );
}
