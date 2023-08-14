// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", function () {
    // Get all the images in the column
    const images = document.querySelectorAll(".image-column > div");

    // Loop through each image and create the scroll animation
    images.forEach((image) => {
        gsap.fromTo(
            image,
            {
                opacity: 0, // Start with 0 opacity (invisible)
                y: 100, // Start 100 pixels below its original position
            },
            {
                opacity: 1, // End with full opacity (visible)
                y: 0, // End at its original position
                duration: 1, // Duration of the animation (in seconds)
                scrollTrigger: {
                    trigger: image, // The image itself is the trigger
                    start: "top 80%", // Animation starts when the top of the image reaches 80% of the viewport height
                    end: "top 20%", // Animation ends when the top of the image reaches 20% of the viewport height
                    scrub: true, // Smooth animation during scrolling
                },
            }
        );
    });
});

const pathToPage = '/6.html'

async function fetchAndInsertContent(pathToPage) {
    try {
        const response = await fetch(pathToPage);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const fetchedContent = doc.querySelector('.content > .image-info');

        if (fetchedContent) {
            // Replace the existing content of an element with id 'target-element'
            // with the content fetched from the other page
            const siblingElement = document.getElementById('_6');
            const parentElement = siblingElement.parentNode;
            parentElement.appendChild(fetchedContent.cloneNode(true));
        } else {
            console.warn('The .content element was not found in the fetched page.');
        }
    } catch (error) {
        console.error('Error fetching and inserting content:', error);
    }
}


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



