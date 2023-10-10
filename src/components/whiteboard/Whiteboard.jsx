import React, { useRef, useEffect, useState } from "react";
import { useWhiteboard } from "../../Provider/Provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./whiteboard.css"
function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');

  useEffect(() => {
    // Set the canvas size to 85vh and 100vw
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);

  const startDrawing = (event) => {
    // event.preventDefault();
    const { offsetX, offsetY } = event.nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    // event.preventDefault();
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const context = canvasRef.current.getContext("2d");
      context.closePath();
      setIsDrawing(false);
    }
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      // Prevent scrolling on touch devices
      // event.preventDefault();
      const touch = event.touches[0];
      const { pageX, pageY } = touch;
      startDrawing({ nativeEvent: { offsetX: pageX, offsetY: pageY } });
    }
  };
  
  const handleTouchMove = (event) => {
    if (event.touches.length === 1) {
      // Prevent scrolling on touch devices
      // event.preventDefault();
      const touch = event.touches[0];
      const { pageX, pageY } = touch;
      draw({ nativeEvent: { offsetX: pageX, offsetY: pageY } });
    }
  };
  
  const handleTouchEnd = (event) => {
    if (event.touches.length === 0) {
      stopDrawing();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      style={{ touchAction: "none", width: "100%", height: "100%" }}
    />
  );
}

export default function Whiteboard() {
  const { clearScreen, resetClearScreen, zoomLevel } = useWhiteboard();
  const [canvases, setCanvases] = useState([]);

  useEffect(() => {
    canvases.forEach((canvasRef) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        context.setTransform(zoomLevel, 0, 0, zoomLevel, 0, 0);
        // ... Rest of your code for canvas setup and drawing
      }
    });
  }, [canvases, zoomLevel]);

  useEffect(() => {
    if (clearScreen) {
      canvases.forEach((canvasRef) => {
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
      resetClearScreen();
    }
  }, [clearScreen, canvases, resetClearScreen]);

  const addNewCanvas = () => {
    setCanvases([...canvases, <Canvas key={canvases.length} />]);
  };

  return (
    <div>
      <div className="slide shadow button translate" onClick={addNewCanvas}> 
          <FontAwesomeIcon icon={faPlus} className="faPlus" />
          </div>
      <div className="canvas-container" style={{ position: "relative", width: "100%", height: "100vh" }}>
        {canvases}
      </div>
      {/* <input type="color" value={color} onChange={(e) => setColor(e.target.value)} /> */}
    </div>
  );
}