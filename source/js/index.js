// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", function () {
    initImageScrollAnimations();
    initImageClicks();
    initLinkClicks();
});

function initImageScrollAnimations() {
    // Get all the images in the column
    const images = document.querySelectorAll(".image-column > div");

    // Loop through each image and create the scroll animation
    images.forEach((image) => {
        createScrollAnimation(image);
    });
}

function createScrollAnimation(image) {
    // Use GSAP to animate the image
    gsap.fromTo(
        image,
        {
            opacity: 0,
            y: 100,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: image,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
        }
    );
}

function initImageClicks() {
    const images = document.querySelectorAll(".content img");

    images.forEach((image) => {
        image.addEventListener("click", handleImageClick);
    });
}

function handleImageClick() {
    if (!this.parentNode.classList.contains("fetched")) {
        const currentPixelToTop = this.getBoundingClientRect().top;
        const desiredPixelToTop = 170;
        if (currentPixelToTop > desiredPixelToTop) {
            scrollToImage(this, currentPixelToTop, desiredPixelToTop);
        }
    }
}

function scrollToImage(image, currentPixelToTop, desiredPixelToTop) {
    const offsetTop = currentPixelToTop + window.scrollY - desiredPixelToTop;
    const animationDuration = 500;

    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    // You can also add a callback here if needed.
}

function initLinkClicks() {
    const fetchLinks = document.querySelectorAll(".content a");

    fetchLinks.forEach((link) => {
        link.addEventListener("click", handleLinkClick);
    });
}

function handleLinkClick(event) {
    event.preventDefault();

    if (this.classList.contains("fetched")) {
        collapseImageInfo(this);
    } else {
        expandImageInfo(this);
    }
}

function collapseImageInfo(link) {
    const imageInfo = link.parentNode.querySelector(".image-info");

    // Use GSAP to animate the collapse
    gsap.to(imageInfo, {
        height: 0,
        opacity: 0,
        duration: 0.5, // Adjust the animation duration as needed
        onComplete: () => {
            imageInfo.style.display = 'none'; // Hide the element after the animation
            // After opening or closing an accordion
            ScrollTrigger.refresh();
        }
    });

    link.classList.remove("fetched");
}

async function expandImageInfo(link) {
    const linkHref = link.getAttribute("href");
    try {
        const fetchedContent = await fetchAndInsertContent(linkHref, link);
        if (fetchedContent) {
            const parentElement = link.parentNode;
            parentElement.appendChild(fetchedContent.cloneNode(true));

            const imageInfo = parentElement.querySelector('.image-info');
            imageInfo.style.display = 'block'; // Ensure the element is visible

            // Use GSAP to animate the expand
            gsap.to(imageInfo, {
                height: 'auto',
                opacity: 1,
                duration: 0.5, // Adjust the animation duration as needed
                onComplete: () => {
                    // After opening or closing an accordion
                    ScrollTrigger.refresh();
                }
            });

            link.classList.add("fetched");
            changeDownloadLink();
        } else {
            console.warn('The .content element was not found in the fetched page.');
        }
    } catch (error) {
        console.error('Error fetching content:', error);
    }
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
        return doc.querySelector('.content > .image-info');
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
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



