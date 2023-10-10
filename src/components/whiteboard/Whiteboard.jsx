import React, { useRef, useEffect, useState } from "react";
import { useWhiteboard } from "../../Provider/Provider";

export default function Whiteboard() {
  const {clearScreen,resetClearScreen,zoomLevel}=useWhiteboard()
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

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
    if (clearScreen) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      resetClearScreen()
    }
  }, [clearScreen]);

  useEffect(() => {
    // Update canvas size when canvasSize changes
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
  }, [canvasSize]);

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

  return (
    <div className="canvas-container" style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        
        style={{ touchAction: "none", width: "100vw", height: "85vh" }}
      />
    </div>
  );
}
