
// GSAP Animations
window.addEventListener('load', function () {
    gsap.to('.preloader', { duration: 1, opacity: 0, display: 'none', ease: 'power1.out' });

    // Start the introduction animation once the preloader is hidden
    gsap.to('.content', { duration: 1, opacity: 1, y: -50, ease: 'power2.out', delay: 1 });
});
