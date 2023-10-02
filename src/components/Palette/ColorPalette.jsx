import React, { useState } from 'react';
import './ColorPalette.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEraser } from '@fortawesome/free-solid-svg-icons';

function ColorPalette() {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container">
      <div className="color-palette">
        <div
          className={`color-box black ${
            selectedColor === 'black' ? 'selected' : ''
          }`}
          onClick={() => handleColorClick('black')}
        ></div>
        <div
          className={`color-box blue ${
            selectedColor === 'blue' ? 'selected' : ''
          }`}
          onClick={() => handleColorClick('blue')}
        ></div>
        <div
          className={`color-box brown ${
            selectedColor === 'brown' ? 'selected' : ''
          }`}
          onClick={() => handleColorClick('brown')}
        ></div>
        <div
          className={`color-box red ${
            selectedColor === 'red' ? 'selected' : ''
          }`}
          onClick={() => handleColorClick('red')}
        ></div>
        <div
          className={`color-box yellow ${
            selectedColor === 'yellow' ? 'selected' : ''
          }`}
          onClick={() => handleColorClick('yellow')}
        ></div>
        <div
          className={`color-box pink ${
            selectedColor === 'pink' ? 'selected' : ''
          }`}
          onClick={() => handleColorClick('pink')}
        ></div>
      </div>
       <div className="pencil"><FontAwesomeIcon icon={faPencil} size='xl' style={{color: "#000000",}} /></div>
<div className="erarser"><FontAwesomeIcon icon={faEraser} size='xl' style={{ color: "#000000" }} />
</div>
    </div>
  );
}

export default ColorPalette;
