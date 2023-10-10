import React from "react";
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
import html2pdf from "html2pdf.js";




export default function Toolkit() {
  // download page functionality
    const handleDownloadClick = async () => {
    try {

      const content = document.documentElement;

      const pdfOptions = {
        margin: 10,
        filename: "page.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().from(content).set(pdfOptions).outputPdf().save();
    } catch (error) {
      console.error("Error converting to PDF:", error);
    }
  };
  const { clearWhiteboard ,zoomIn,zoomOut} = useWhiteboard();
  const handleClearScreen = () => {
    clearWhiteboard(); 
  };

  
  return (
    <div className="container-bottom">
      <div className="toolkit">
        <div className="shift-down">
          <div className="zoom shadow button">
            <div className="plus"onClick={zoomIn} >
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </div>
            <div className="percent" >  100%</div>
            <div className="minus" onClick={zoomOut}>
              <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
            </div>
          </div>
        </div>
        <div className="tools shadow">
          <div className="pens">
            <FontAwesomeIcon icon={faPen} size="2x" style={{ color: "#313539" }}  />
          </div>
          <div className="stickynotes">
            <FontAwesomeIcon
              icon={faNoteSticky}
              size="2x" 
              style={{ color: "#fecd52" }}
            />
          </div>
          <div className="text">
            <FontAwesomeIcon className ="custom.icon" icon={faT} size="2x" style={{ color: "#313539" }} />
          </div>
          <div className="shapes">
            <FontAwesomeIcon className ="custom.icon" icon={faShapes} size="2x" style={{ color: "#313539" }} />
          </div>
          <div className="download" onClick={handleDownloadClick}>
            <FontAwesomeIcon icon={faDownload} className="custom.icon" size="2x" style={{ color: "#313539" }}  />
          </div>
        </div>
        <div className=" button clear shadow" onClick={handleClearScreen}>
          clear
        </div>
      </div>
    </div>
  );
}