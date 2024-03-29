import React, { createContext, useContext, useState, useRef } from "react";

const WhiteboardContext = createContext();

export const useWhiteboard = () => {
  return useContext(WhiteboardContext);
};

export const WhiteboardProvider = ({ children }) => {
  const [clearScreen, setClearScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Initialize with 100% zoom
  const [canvases, setCanvases] = useState([]);
  //pen color functionality
  const [color, setColor] = useState("#000000"); //default color
  //eraser
  const [isErasing, setIsErasing] = useState(false);
  const contextRef = useRef(null);

  const clearWhiteboard = () => {
    setClearScreen(true);
  };

  const resetClearScreen = () => {
    setClearScreen(false);
  };
  const zoomIn = () => {
      if (zoomLevel < 2) { // Limit maximum zoom level to 200%
        console.log("zoomIn")
        setZoomLevel(zoomLevel + 0.1); // You can adjust the zoom increment as needed
    }
};

const zoomOut = () => {
    if (zoomLevel > 0.5) { // Limit minimum zoom level to 50%
        console.log("zoomOut")
      setZoomLevel(zoomLevel - 0.1); // You can adjust the zoom decrement as needed
    }
  };

  const eraser = (x, y) => {
    const context = contextRef.current;

    if (!context) {
      return;
    }

    if (isErasing) {
      context.strokeStyle = 'white'; // Use white color for eraser
    } else {
      context.strokeStyle = color; // Set the current color
    }
  };
  

  const toggleEraser = () => {
    setIsErasing(isErasing);
  };

  return (
    <WhiteboardContext.Provider value={{ clearScreen, clearWhiteboard, resetClearScreen,zoomIn,zoomOut,canvases,setCanvases, color, setColor, eraser, isErasing, toggleEraser}}>
      {children}
      {/* <div>
        <input 
          type="color"
          value={color}
          onChange={(e)=>setColor(e.target.value)}/>
      </div> */}
    </WhiteboardContext.Provider>
  );
};

