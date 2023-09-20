gsap.registerPlugin(Flip);

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
                    end: "top 30%", // Animation ends when the top of the image reaches 20% of the viewport height
                    scrub: true, // Smooth animation during scrolling
                },
            }
        );
    });

    changeImageClicks();
    giveTouchTooltip();
});

function changeImageClicks() {
    const fetchLinks = document.querySelectorAll(".content a");
    const images = document.querySelectorAll(".content img");

    images.forEach(image => {

        image.addEventListener("click", function () {
            if (!this.parentNode.classList.contains("fetched")) {
                const currentPixelToTop = this.getBoundingClientRect().top;
                const desiredPixelToTop = 170;
                if ( currentPixelToTop > desiredPixelToTop) {
                    const offsetTop = currentPixelToTop + window.scrollY - desiredPixelToTop;
                    const animationDuration = 500; // Adjust the animation duration as needed
                    window.scrollTo({ top: offsetTop, behavior: 'smooth', duration: animationDuration });
                }
            }
        });
    });

    fetchLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            if (this.classList.contains("fetched")) {
                // Collapse and remove image info
                const imageInfo = this.parentNode.querySelector(".image-info");
                const state = Flip.getState(imageInfo, { props: "opacity" });
                imageInfo.classList.remove("active");
                Flip.from(state, {
                    onComplete: () => {
                        imageInfo.remove()
                    }
                });;
                this.classList.remove("fetched");
            } else {
                // Add and expand image info
                const linkHref = this.getAttribute("href");
                fetchAndInsertContent(linkHref, this);
                this.classList.add("fetched");
            }
        });
    });
}

async function fetchAndInsertContent(pathToPage, thisElement) {
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
            const parentElement = thisElement.parentNode;
            parentElement.appendChild(fetchedContent.cloneNode(true));
            const imageInfo = parentElement.querySelector('.image-info');
            const state = Flip.getState(imageInfo, { props: "opacity" });
            imageInfo.classList.add("active");
            Flip.from(state, {
                onComplete: () => {
                    changeDownloadLink();
                }
            });
        } else {
            console.warn('The .content element was not found in the fetched page.');
        }
    } catch (error) {
        console.error('Error fetching and inserting content:', error);
    }
}

function giveTouchTooltip() {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        // window.alert("touch!");
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



