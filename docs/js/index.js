var images = document.getElementsByClassName('art');
var artContainer = document.getElementById('artcontainer');
var artContainerWidth = artContainer.clientWidth;
var fixedWindowHeight = window.innerHeight;

function update() {
  var fullSizePosition = 100;
  var actionArea = fixedWindowHeight - fullSizePosition;

  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    var imagePosition = image.getBoundingClientRect();

    if (imagePosition.top < window.innerHeight && imagePosition.bottom >= 0 && imagePosition.top >= fullSizePosition) {

      // percent to fullSizePosition
      var multiply = (imagePosition.top - fullSizePosition) / actionArea;

      // Calculate the new width and grayscale value based on the inverted percentage from the middle
      const newWidth = 100 * (1 - multiply);
      const grayscaleValue = 100 * multiply;

      // Set the new styles for the image
      image.style.width = newWidth + '%';
      // image.style.filter = 'grayscale(' + grayscaleValue + '%)';
    } else {
      image.style = {};
    }
  }
}

function hideElement(element) {
  element.style.opacity = 0;
}

// Function to create the fade-in effect for a given element
function fadeIn(element, duration) {
  var start = 0;
  var end = 1;
  var current = start;
  var increment = 0.01; // Adjust this value for smoother or faster fading

  element.style.opacity = start;

  var timer = setInterval(function () {
    current += increment;
    element.style.opacity = current;

    if (current >= end) {
      clearInterval(timer);
    }
  }, duration / (1 / increment));
}

function fixViewportHeight() {
  fixedWindowHeight = window.innerHeight;
}

function handleResize() {
  // Check if the width has changed since the last resize event
  if (window.innerWidth !== handleResize.prevWidth) {
    // Width has changed, do your resize-related tasks here
    fixViewportHeight();
    update();
    console.log("Reszize");

    // Update the previous width value to the current width
    handleResize.prevWidth = window.innerWidth;
  }
}

// Initialize the previous width value with the current width
handleResize.prevWidth = window.innerWidth;

(function initialize() {
  hideElement(artContainer);
  window.addEventListener('load', update, fadeIn(artContainer, 1000));
})();

window.addEventListener('scroll', update);
window.addEventListener('resize', handleResize);