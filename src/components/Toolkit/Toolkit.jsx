import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./toolkit.css";
import {
  faDownload,
  faEraser,
  faNoteSticky,
  faPen,
  faShapes,
  faT,
  faTimes,
  faBold,
  faItalic,
  faUnderline,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useWhiteboard } from "../../Provider/Provider";
import html2pdf from "html2pdf.js";

export default function Toolkit() {
  //sticky notes
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [stickyNoteText, setStickyNoteText] = useState("");
  const [stickyNotePosition, setStickyNotePosition] = useState({
    top: "50%",
    left: "50%",
  });
  const [stickyNoteColor, setStickyNoteColor] = useState("lightyellow");
  const [showColorChoices, setShowColorChoices] = useState(false);
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const toggleStickyNote = () => {
    setShowStickyNote(!showStickyNote);
    setShowColorChoices(false);
  };

  const toggleColorChoices = () => {
    setShowColorChoices(!showColorChoices);
  };

  const handleStickyNoteChange = (e) => {
    setStickyNoteText(e.target.value);
  };

  const handleStickyNoteDrag = (e) => {
    setStickyNotePosition({
      top: e.clientY + "px",
      left: e.clientX + "px",
    });
  };

  const colorChoices = ["lightyellow", "lightblue", "lightpink", "lightpurple"];

  const handleColorChange = (color) => {
    setStickyNoteColor(color);
    setShowColorChoices(false);
  };

  const handleFontStyleChange = (style) => {
    setFontStyle((prevFontStyle) => ({
      ...prevFontStyle,
      [style]: !prevFontStyle[style],
    }));
  };

  const handleDeleteStickyNote = () => {
    setShowStickyNote(false);
  };
  //Eraser functionality
  const handleEraserClick = () => {
    setIsErasing(!isErasing);
    setIsDrawing(false);
    setShowStickyNote(false);
    setShowText(false);
    setShowColorChoices(false);
  };

  // download page functionality
  const handleDownloadClick = async () => {
    try {
      const content = document.documentElement;

      const pdfOptions = {
        margin: 10,
        filename: "page.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },

        jsPDF: {
          unit: "mm",
          format: "a1",
          orientation: "landscape",
          pagesplit: true,
        },
      };

      await html2pdf().from(content).set(pdfOptions).outputPdf().save();
    } catch (error) {
      console.error("Error converting to PDF:", error);
    }
  };
  const { clearWhiteboard } = useWhiteboard();
  const handleClearScreen = () => {
    clearWhiteboard();
  };

  return (
    <div className="container-bottom">
      <div className="toolkit">
        <div className="shift-down">
          <div className="slide shadow button"></div>
        </div>
        <div className="tools shadow">
          <div className="pens">
            <FontAwesomeIcon
              icon={faPen}
              size="2x"
              style={{ color: "#313539" }}
            />
          </div>
          <div className="erarser" onClick={handleEraserClick}>
            <FontAwesomeIcon
              className="custom.icon"
              icon={faEraser}
              size="2x"
              style={{ color: "#313539" }}
            />
          </div>
          <div className="stickynotes" onClick={toggleStickyNote}>
            <FontAwesomeIcon
              icon={faNoteSticky}
              size="2x"
              style={{ color: "#fecd52" }}
            />
          </div>
          <div className="text">
            <FontAwesomeIcon
              className="custom.icon"
              icon={faT}
              size="2x"
              style={{ color: "#313539" }}
            />
          </div>
          <div className="shapes">
            <FontAwesomeIcon
              className="custom.icon"
              icon={faShapes}
              size="2x"
              style={{ color: "#313539" }}
            />
          </div>
          <div className="download" onClick={handleDownloadClick}>
            <FontAwesomeIcon
              icon={faDownload}
              className="custom.icon"
              size="2x"
              style={{ color: "#313539" }}
            />
          </div>
        </div>
        <div className=" button clear shadow" onClick={handleClearScreen}>
          clear
        </div>
        {showStickyNote && (
          <div
            className="sticky-note"
            style={{
              top: stickyNotePosition.top,
              left: stickyNotePosition.left,
              transform: "translate(-50%, -50%)",
              position: "fixed",
              backgroundColor: stickyNoteColor,
              padding: "10px",
              zIndex: "1000",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              border: "none",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={handleDeleteStickyNote}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <textarea
              placeholder="Enter your note here..."
              style={{
                width: "100%",
                height: "100px",
                border: "none",
                backgroundColor: "transparent",
                fontWeight: fontStyle.bold ? "bold" : "normal",
                fontStyle: fontStyle.italic ? "italic" : "normal",
                textDecoration: fontStyle.underline ? "underline" : "none",
                color: "black",
              }}
              value={stickyNoteText}
              onChange={handleStickyNoteChange}
            />
            <div
              style={{
                display: "flex",
                alignItems: "centre",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
                onClick={() => handleFontStyleChange("bold")}
              >
                <FontAwesomeIcon icon={faBold} style={{ color: "white" }} />
              </div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
                onClick={() => handleFontStyleChange("italic")}
              >
                <FontAwesomeIcon icon={faItalic} style={{ color: "white" }} />
              </div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
                onClick={() => handleFontStyleChange("underline")}
              >
                <FontAwesomeIcon
                  icon={faUnderline}
                  style={{ color: "white" }}
                />
              </div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
                onClick={toggleColorChoices}
              >
                <FontAwesomeIcon icon={faCircle} style={{ color: "white" }} />
              </div>
            </div>
          </div>
        )}
        {showColorChoices && (
          <div
            className="color-choices"
            style={{
              position: "fixed",
              top: stickyNotePosition.top,
              left: stickyNotePosition.left + 40,
              display: "flex",
              flexDirection: "column",
              zIndex: "1000",
            }}
          >
            {colorChoices.map((color) => (
              <div
                key={color}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: color,
                  margin: "5px 0",
                  cursor: "pointer",
                }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
