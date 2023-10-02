import React, { useState, useEffect} from "react";
import './slides.css';

export default function Slides() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [firstSlideAdded, setFirstSlideAdded] = useState(false);

  useEffect(() => {
    showSlides(slideIndex);
  });

  const addWritingSlide = () => {
    if (!firstSlideAdded) {
      // Creating a writing board for the first slide
      createWritingBoard();
      setFirstSlideAdded(true);
    } else {
      setSlideIndex(slideIndex + 1);
      const canvasElement = document.createElement('canvas');
      canvasElement.classList.add('writing-slide');
      document.getElementById('slide-container').appendChild(canvasElement);
    }
  };

  const createWritingBoard = () => {
    setSlideIndex(slideIndex + 1);
    const canvasElement = document.createElement('canvas');
    canvasElement.classList.add('writing-slide');
    document.getElementById('slide-container').appendChild(canvasElement);
  };

  const plusSlides = (n) => {
    setSlideIndex(slideIndex + n);
  };

  const showSlides = (index) => {
    const slides = document.getElementsByClassName('writing-slide');
  
    if (slides.length === 0) {
      // No 'writing-slide' elements found, handle this case as needed
      return;
    }
  
    if (index < 1) {
      setSlideIndex(1);
    } else if (index > slides.length) {
      setSlideIndex(slides.length);
    }
  
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
  
    if (slides.length > 0) {
      slides[slideIndex - 1].style.display = 'block';
    }
  };
  

  return (
    <>
      <div>
        <div className="container">
          <nav className="navbar fixed-top navbar-expand-sm bg-light">
            <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" className="navbar-toggler" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <div href="#" className="nav-link active">
                    Home
                  </div>
                </li>
                {/* Add New Slide Dropdown */}
                <li className="nav-item dropdown">
                  <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Add New Slide
                  </div>
                  {/* Dropdown Menu */}
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {/* Content inside the dropdown */}
                    <li className="dropdown-item">
                      {/* Navigation controls for slides */}
                      <span className="d-flex">
                        <button className="prev btn btn-outline-dark" onClick={() => plusSlides(-1)}>
                          &#10094;
                        </button>
                        <button
                          id="add-slide-button"
                          type="button"
                          className="btn btn-light"
                          onClick={addWritingSlide}
                        >
                          New Slide
                        </button>
                        <button className="next btn btn-outline-dark" onClick={() => plusSlides(1)}>
                          &#10095;
                        </button>
                      </span>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    Profile
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <br />
        <div className="main-container">
          <canvas id="slide-container">
          </canvas>
        </div>
      </div>
    </>
  );
}
