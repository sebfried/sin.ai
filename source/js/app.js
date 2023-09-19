// Wait for the page to load before running the animation
window.addEventListener('load', function () {
  // Use GSAP to create an animation
  gsap.to('.preloader', {
    opacity: 0, // Change the opacity to 0
    duration: 1, // Set the duration of the animation
    ease: 'power2.out', // Use an easing function (ease out in this case)
    onComplete: function () {
      gsap.to('.preloader', { display: 'none' });
      gsap.to('.content', { duration: 1, opacity: 1, y: -20, ease: 'power2.out' });
    }
  });
});

function changeDownloadLink() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('change', function () {
      const downloadLink = this.nextElementSibling;
      downloadLink.href = this.value;
    });
  });
}

changeDownloadLink();

// // GSAP Animations
// window.addEventListener('load', function () {
//     gsap.to('.preloader', { duration: 2, opacity: 0, overwrite: "all", ease: 'power1.out' });

//     // Add delay before hiding the preloader
//     gsap.to('.preloader', { delay: 2, display: 'none' });

//     // Start the introduction animation once the preloader is hidden
//     gsap.to('.content', { duration: 1, opacity: 1, y: -50, ease: 'power2.out', delay: 4 });
// });