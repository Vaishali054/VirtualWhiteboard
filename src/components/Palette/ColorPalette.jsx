import React, { useState } from 'react';
import './ColorPalette.css'; 

function ColorPalette() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
 const colors = ['black', 'blue', 'brown', 'red', 'pink', 'yellow'];
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <div className="palette-container">
      <div className="color-palette">
        {colors.map((color) => (
          <Box
            key={color}
            color={color}
            selectedColor={selectedColor}
            handleColorClick={handleColorClick}
          />
        ))}
      </div>
    </div>
  );
}

function Box({ color, selectedColor, handleColorClick }) {
  return (
    <div
      className={`color-box ${color} ${
        selectedColor === color ? 'selected' : ''
      }`}
      onClick={() => handleColorClick(color)}
    ></div>
  );
}

export default ColorPalette;

