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
      const slideElement = document.createElement('div');
      slideElement.textContent = `Writing Slide ${slideIndex}`;
      slideElement.classList.add('writing-slide');
      document.getElementById('slide-container').appendChild(slideElement);
    }
  };

  const createWritingBoard = () => {
    setSlideIndex(slideIndex + 1);
    const slideElement = document.createElement('div');
    slideElement.innerHTML = `
        <div class="writing-board">
            <textarea class="writing-area" placeholder="Start writing..."></textarea>
        </div>
    `;
    slideElement.classList.add('writing-slide');
    document.getElementById('slide-container').appendChild(slideElement);
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
      <div className="container">
        <a href="" className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <button id="add-slide-button" type="button" className="btn btn-light" onClick={addWritingSlide}>
          Add Writing Slide
        </button>
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
      </div>
      <br />
      <div className="main-container">
        <div id="slide-container" className="slide-container"></div>
      </div>
    </>
  );
}
