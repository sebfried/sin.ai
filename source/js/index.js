document.addEventListener("DOMContentLoaded", function () {
    initImageScrollAnimations();
    initImageClicks();
    initLinkClicks();
});

function initImageScrollAnimations() {
    const images = document.querySelectorAll(".image-column > div");

    images.forEach((image) => {
        createScrollAnimation(image);
    });
}

function createScrollAnimation(image) {
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
            scrollToTop(this, currentPixelToTop, desiredPixelToTop);
        }
    }
}

function scrollToTop(image, currentPixelToTop, desiredPixelToTop) {
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

    gsap.to(imageInfo, {
        height: 0,
        opacity: 0,
        duration: 0.5, 
        onComplete: () => {
            imageInfo.style.display = 'none';
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
            imageInfo.style.display = 'block';

            gsap.to(imageInfo, {
                height: 'auto',
                opacity: 1,
                duration: 0.5, 
                onComplete: () => {
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