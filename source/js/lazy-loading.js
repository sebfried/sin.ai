



//
// Functions
//

// Complex Lazy Loading

// // Remove HTML Lazy Loading
// // HTML Lazy Loading is only used for browsers without JavaScript. 
// // If JavaScript is enabled, we use Lazy Loading with JavaScript.
// function removeHtmlLazyLoading() {
//     const lazyImages = document.querySelectorAll('img[loading="lazy"]');
//     for (const img of lazyImages) {
//         img.removeAttribute('loading');
//     }
// }

// // Prepare Images for Lazy Loading
// function srcToDataSrc() {
//     const lazyImages = document.querySelectorAll('.lazy img');
//     for (const img of lazyImages) {
//         const src = img.getAttribute('src');
//         img.setAttribute('date-src', src);
//         img.removeAttribute('src');
//     }
// }

// // Load Image
// function loadImage(img) {
//     const src = img.getAttribute('data-src');
//     img.setAttribute('src', src);
// }

// // Function to handle lazy loading
// function lazyLoadImage(image) {
//     if (image.dataset.src) {
//         image.src = image.dataset.src;
//         image.removeAttribute('data-src');
//     }
// }

// // Lazy Loading Images
// document.addEventListener('DOMContentLoaded', function () {
//     const images = document.querySelectorAll('.lazy img');

//     // Intersection Observer configuration
//     const observerOptions = {
//         rootMargin: '0px 0px -1000px 0px', // Load when the image is 1000px away from the bottom edge of the viewport
//         threshold: 0 // Set to 0 to ensure the callback is fired as soon as the element enters the viewport
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 const overlay = img.previousElementSibling;

//                 // Start preloader fade-out animation using GSAP
//                 gsap.to(overlay, {
//                     duration: 1, opacity: 0, onComplete: () => {
//                         overlay.style.display = 'none'; // Hide the overlay once the animation is done
//                     }
//                 });

//                 img.src = img.getAttribute('data-src'); // Load the image
//                 observer.unobserve(img); // Stop observing the image once it's loaded
//             }
//         });
//     }, observerOptions);

//     // Start observing each lazy-loaded image
//     images.forEach((img) => {
//         observer.observe(img);
//     });
// });



