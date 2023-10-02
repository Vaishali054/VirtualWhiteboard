import React, { useState } from 'react';
import './ColorPalette.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEraser } from '@fortawesome/free-solid-svg-icons';

function ColorPalette() {
  const [selectedTool, setSelectedTool] = useState(null);
 const colors = ['black', 'blue', 'brown', 'red', 'pink', 'yellow'];



  const handleColorClick = (color) => {
    setSelectedColor(color);
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


       <div className="pencil"><FontAwesomeIcon icon={faPencil} size='xl' style={{color: "#000000",}} /></div>
<div className="erarser"><FontAwesomeIcon icon={faEraser} size='xl' style={{ color: "#000000" }} />
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

