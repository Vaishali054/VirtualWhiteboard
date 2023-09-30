import React, { useState, useEffect } from 'react';
import './slides.css';

export default function Slides() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [firstSlideAdded, setFirstSlideAdded] = useState(false);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const addWritingSlide = () => {
    if (!firstSlideAdded) {
      // Creating writing board for the first slide
      createWritingBoard();
      setFirstSlideAdded(true);
    } else {
      setSlideIndex(slideIndex + 1);
      const slideElement = document.createElement('canvas');
      slideElement.textContent = `Writing Slide ${slideIndex}`;
      slideElement.classList.add('writing-slide');
      document.getElementById('slide-container').appendChild(slideElement);
    }
  };

  const createWritingBoard = () => {
    slideIndex++;
    const canvasElement = document.createElement('canvas');
    canvasElement.classList.add('writing-slide');
    document.getElementById('slide-container').appendChild(canvasElement);
  };

  const plusSlides = (n) => {
    setSlideIndex(slideIndex + n);
  };

  const showSlides = (index) => {
    const slides = document.getElementsByClassName('writing-slide');

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
            <a href="#" className="navbar-brand mb-0 h1">
              <img
                className="d-inline-block align-top"
                src="images/logo.png"
                alt="logo"
                width="40"
                height="40"
              />
            </a>
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              className="navbar-toggler"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a href="#" className="nav-link active">
                    Home
                  </a>
                </li>
                {/* Add New Slide Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Add New Slide
                  </a>
                  {/* Dropdown Menu */}
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {/* Content inside the dropdown */}
                    <li className="dropdown-item">
                      {/* Navigation controls for slides */}
                      <span className="d-flex">
                        <a
                          className="prev"
                          onClick={() => this.plusSlides(-1)}
                        >
                          &#10094;
                        </a>
                        <button
                          id="add-slide-button"
                          type="button"
                          className="btn btn-light"
                          onClick={this.addWritingSlide}
                        >
                          New Slide
                        </button>
                        <a
                          className="next"
                          onClick={() => this.plusSlides(1)}
                        >
                          &#10095;
                        </a>
                      </span>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link ">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <br />
        <div className="main-container">
          <canvas id="slide-container"></canvas>
        </div>
      </div>
    </>
  );
}
