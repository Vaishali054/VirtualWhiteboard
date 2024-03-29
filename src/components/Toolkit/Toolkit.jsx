import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./toolkit.css";
import {
  faDownload,
  faNoteSticky,
  faPen,
  faShapes,
  faT,
  faTimes,
  faBold,
  faItalic,
  faUnderline,
  faCircle,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { useWhiteboard } from "../../Provider/Provider";
import html2pdf from "html2pdf.js";

export default function Toolkit() {
  //text functionality
  const [showTextNote, setShowTextNote] = useState(false);
  const [textNoteText, setTextNoteText] = useState("");
  const [textNotePosition, setTextNotePosition] = useState({
    top: "50%",
    left: "50%",
    right: "70%",
  });

  const toggleTextNote = () => {
    setShowTextNote(!showTextNote);
  };

  const handleTextNoteChange = (e) => {
    setTextNoteText(e.target.value);
  };
  //sticky notes
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [stickyNoteText, setStickyNoteText] = useState("");
  const [stickyNotePosition, setStickyNotePosition] = useState({
    top: "50%",
    left: "10%",
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

  const colorChoices = ["lightyellow", "lightblue", "lightpink"];

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

  //pen tool
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [penColor, setPenColor] = useState("black");

  const toggleColorPicker = () => {
    setColorPickerVisible(!isColorPickerVisible);
  };
  const handleColorSelection = (selectedColor) => {
    setPenColor(selectedColor);
    setColorPickerVisible(false);
  };
  const penColorChoices = [
    "lightgreen",
    "black",
    "orange",
    "blue",
    "lightpink",
    "green",
    "yellow",
    "lightblue",
    "lavender",
  ];

  return (
    <div className="container-bottom">
      <div className="toolkit">
        <div className="tools shadow">
          <div className="pens">
            <FontAwesomeIcon
              icon={faPen}
              size="lg"
              style={{ color: "#313539" }}
              onClick={toggleColorPicker}
            />
          </div>
          <div className="eraser">
            {
              <FontAwesomeIcon
                className="custom.icon"
                icon={faEraser}
                size="lg"
                style={{ color: "#313539" }}
                onClick={handleClearScreen}
              />
            }
          </div>
          <div className="stickynotes" onClick={toggleStickyNote}>
            <FontAwesomeIcon
              icon={faNoteSticky}
              size="lg"
              style={{ color: "#fecd52" }}
            />
          </div>
          <div className="text" onClick={toggleTextNote}>
            <FontAwesomeIcon
              className="custom.icon"
              icon={faT}
              size="lg"
              style={{ color: "#313539" }}
            />
          </div>
          <div className="download" onClick={handleDownloadClick}>
            <FontAwesomeIcon
              icon={faDownload}
              className="custom.icon"
              size="lg"
              style={{ color: "#313539" }}
            />
          </div>
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
              // Responsive styles for sticky note
              width: "200px", // Adjust width as needed
              height: "150px", // Adjust height as needed
              "@media (max-width: 768px)": {
                width: "150px", // Adjust for smaller screens
                height: "100px",
                position: "centre",
              },
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleFontStyleChange("bold")}
              >
                <FontAwesomeIcon
                  icon={faBold}
                  size="sm"
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleFontStyleChange("italic")}
              >
                <FontAwesomeIcon
                  icon={faItalic}
                  size="sm"
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleFontStyleChange("underline")}
              >
                <FontAwesomeIcon
                  icon={faUnderline}
                  size="sm"
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={toggleColorChoices}
              >
                <FontAwesomeIcon
                  icon={faCircle}
                  size="sm"
                  style={{ color: "white" }}
                />
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
              left: stickyNotePosition.left + 10,
              display: "flex",
              flexDirection: "column",
              zIndex: "1000",
              // Responsive styles for color choices
              "@media (max-width: 768px)": {
                left: stickyNotePosition.left - 10, // Adjust for smaller screens
              },
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
        {showTextNote && (
          <div
            className="text-note"
            style={{
              top: textNotePosition.top,
              left: textNotePosition.left,
              transform: "translate(-50%, -50%)",
              position: "fixed",
              backgroundColor: "transparent",
              zIndex: "1000",
              padding: "5px",
              borderRadius: "10px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              border: "1px solid transparent",
              // Responsive styles for text note
              width: "150px", // Adjust width as needed
              height: "170px", // Adjust height as needed
              textAlign: "center",
              "@media (max-width: 768px)": {
                width: "50px", // for smaller screens
                height: "50px",
              },
            }}
          >
            <textarea
              style={{
                width: "100%",
                height: "80%",
                border: "none",
                backgroundColor: "transparent",
                color: "black",
                fontSize: "16px",
                resize: "none",
              }}
              value={textNoteText}
              onChange={handleTextNoteChange}
            />
            <span
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={toggleTextNote}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
