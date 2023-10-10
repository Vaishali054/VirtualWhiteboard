import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./toolkit.css";
import {
  faDownload,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faNoteSticky,
  faPen,
  faShapes,
  faT,
} from "@fortawesome/free-solid-svg-icons";
import { useWhiteboard } from "../../Provider/Provider";

export default function Toolkit() {
  const { clearWhiteboard } = useWhiteboard();
  const handleClearScreen = () => {
    clearWhiteboard(); 
  };
 
  return (
    <div className="container-bottom" >
      <div className="toolkit" id="toolkit">
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
            <FontAwesomeIcon icon={faPen} size="lg" />
          </div>
          <div className="stickynotes">
            <FontAwesomeIcon
              icon={faNoteSticky}
              style={{ color: "#c4d56c" }}
              size="lg"
            />
          </div>
          <div className="text">
            <FontAwesomeIcon className ="custom.icon" icon={faT} size="lg" />
          </div>
          <div className="shapes">
            <FontAwesomeIcon className ="custom.icon" icon={faShapes} size="lg" />
          </div>
          <div className="download">
            <FontAwesomeIcon icon={faDownload} className="custom.icon" size="lg"/>
          </div>
        </div>
        <div className=" button clear shadow" onClick={handleClearScreen} >
          clear
        </div>
      </div>
    </div>
  );
}
