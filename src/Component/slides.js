let slideIndex = 0;
let firstSlideAdded = false;
function addWritingSlide() {
    if (!firstSlideAdded) {
        // Creating writing board for the first slide
        createWritingBoard();
        firstSlideAdded = true;
    } else {
        slideIndex++;
        const slideElement = document.createElement('canvas');
        // slideElement.textContent = `Writing Slide ${slideIndex}`;
        // slideElement.classList.add('writing-slide');
        // document.getElementById('slide-container').appendChild(slideElement);
        slideElement.id = `canvas-${slideIndex}`;
        slideElement.classList.add('writing-slide');
        document.getElementById('slide-container').appendChild(slideElement);
    }
}

document.getElementById('add-slide-button').addEventListener('click', addWritingSlide);

// Function to create a writing board
function createWritingBoard() {
    slideIndex++;
    const canvasElement = document.createElement('canvas');
    canvasElement.classList.add('writing-slide');
    document.getElementById('slide-container').appendChild(canvasElement);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(index) {
    const slides = document.getElementsByClassName('writing-slide');

    if (index < 1) {
        slideIndex = 1;
    } else if (index > slides.length) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = 'block';
    }
}
showSlides(slideIndex);