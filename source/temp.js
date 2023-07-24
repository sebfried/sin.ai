// Function to update the size and grayscale filter of the images
function updateImages() {
    // Get the middle position of the window
    const middlePosition = window.innerHeight / 2;

    // Retrieve all the images on the page
    const images = document.getElementsByTagName('img');

    // Loop through all the images
    for (let i = 0; i < images.length; i++) {
        const image = images[i];

        // Get the position of the current image in the viewport
        const position = image.getBoundingClientRect();

        // Calculate the distance from the image to the middle of the window
        const distanceToMiddle = Math.abs(position.top + position.height / 2 - middlePosition);

        // Calculate the percentage of how far the image is from the middle (0% at the middle, 100% at the top or bottom)
        const percentFromMiddle = distanceToMiddle / middlePosition;

        // Calculate the new width and grayscale value based on the percentage from the middle
        const newWidth = 200 + percentFromMiddle * 200;
        const grayscaleValue = 100 - percentFromMiddle * 100;

        // Set the new styles for the image
        image.style.width = newWidth + 'px';
        image.style.filter = 'grayscale(' + grayscaleValue + '%)';
    }
}

// Variable to keep track of the last scroll position
let lastScrollY = window.scrollY;

// Variable to prevent excessive function calls while scrolling
let ticking = false;

// Function to update images when scrolling
function updateOnScroll() {
    // Update the images only if the scroll position has changed
    if (!ticking && lastScrollY !== window.scrollY) {
        // Request animation frame to update the images
        requestAnimationFrame(() => {
            updateImages();
            ticking = false; // Reset the ticking variable inside the animation frame
        });
        ticking = true;
    }
}

// Call the updateOnScroll function on scroll event
window.addEventListener('scroll', () => {
    // Update last scroll position
    lastScrollY = window.scrollY;

    // Call the updateOnScroll function to update the images
    updateOnScroll();
});

// Call the updateImages function once on page load
updateImages();
