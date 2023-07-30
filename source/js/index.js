// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    removeHtmlLazyLoading();
});

// GSAP Animations
window.addEventListener('load', function () {
    gsap.to('.preloader', { duration: 1, opacity: 0, display: 'none', ease: 'power1.out' });

    // Start the introduction animation once the preloader is hidden
    gsap.to('.content', { duration: 1, opacity: 1, y: -50, ease: 'power2.out', delay: 1 });
});

//
// Functions
//

// Remove HTML Lazy Loading
// HTML Lazy Loading is only used for browsers without JavaScript. 
// If JavaScript is enabled, we use Lazy Loading with JavaScript.
function removeHtmlLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    for (const img of lazyImages) {
        img.removeAttribute('loading');
    }
}

// // Wait for the document to be ready
// document.addEventListener("DOMContentLoaded", function () {
//     // Get all the images in the column
//     const images = document.querySelectorAll(".image-column img");

//     // Loop through each image and create the scroll animation
//     images.forEach((image) => {
//         gsap.fromTo(
//             image,
//             {
//                 opacity: 0, // Start with 0 opacity (invisible)
//                 y: 100, // Start 100 pixels below its original position
//             },
//             {
//                 opacity: 1, // End with full opacity (visible)
//                 y: 0, // End at its original position
//                 duration: 1, // Duration of the animation (in seconds)
//                 scrollTrigger: {
//                     trigger: image, // The image itself is the trigger
//                     start: "top 80%", // Animation starts when the top of the image reaches 80% of the viewport height
//                     end: "top 20%", // Animation ends when the top of the image reaches 20% of the viewport height
//                     scrub: true, // Smooth animation during scrolling
//                 },
//             }
//         );
//     });
// });

