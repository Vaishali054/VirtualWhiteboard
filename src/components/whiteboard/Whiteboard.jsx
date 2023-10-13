import React, { useRef, useEffect, useState } from "react";
import { useWhiteboard } from "../../Provider/Provider";


export default function Whiteboard() {
  const { clearScreen, resetClearScreen, zoomLevel } = useWhiteboard();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [eraserSize, setEraserSize] = useState(10); // Adjust the size as needed
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;

    // Set initial canvas size based on the container size
    const container = canvas.parentElement;
    setCanvasSize({ width: container.offsetWidth, height: container.offsetHeight });

    // Update canvas size when the window is resized
    const handleResize = () => {
      setCanvasSize({ width: container.offsetWidth, height: container.offsetHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Apply the zoom level to the context
    context.setTransform(zoomLevel, 0, 0, zoomLevel, 0, 0);
  }, [canvasSize, zoomLevel]);

  useEffect(() => {
    if (clearScreen) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      resetClearScreen();
    }
  }, [clearScreen]);

  useEffect(() => {
    // Update canvas size when canvasSize changes
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
  }, [canvasSize]);

  const startDrawing = (event) => {
    // event.preventDefault();
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    // event.preventDefault();
    if (!isDrawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.strokeStyle = color;
    contextRef.current.stroke();
    // const context = contextRef.current;
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
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
    <div className="canvas-container" style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none", width: "100vw", height: "75vh" }}
      />
      {/* <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      /> */}
    </div>
  );
}