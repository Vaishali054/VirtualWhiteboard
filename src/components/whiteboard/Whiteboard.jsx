import React, { useRef, useEffect, useState } from "react";
import "./whiteboard.css";

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContainer = canvas.parentElement;
    
    // Function to update the canvas size based on the container's width
    const updateCanvasSize = () => {
      const containerWidth = canvasContainer.clientWidth;
      const aspectRatio = 16 / 9; // Adjust the aspect ratio as needed
      const maxHeight = Math.min(containerWidth / aspectRatio, window.innerHeight);

      canvas.width = containerWidth;
      canvas.height = maxHeight;
      const context = canvas.getContext("2d");
      contextRef.current = context;
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize(); // Initial canvas size setup

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  const startDrawing = (event) => {
    event.preventDefault();
    if (!isDrawing) {
      const { offsetX, offsetY } = event.nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };
  const onClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        style={{ touchAction: "none" }}
      />
    </div>
    <div>
    {/* <div className=" button clear shadow" onClick={onClearCanvas}>
          clear
        </div> */}
    </div>
    </>
  );
}
