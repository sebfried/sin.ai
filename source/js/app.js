window.addEventListener('load', function () {
  gsap.to('.preloader', {
    opacity: 0, 
    duration: 1, 
    ease: 'power2.out', 
    onComplete: function () {
      gsap.to('.preloader', { display: 'none' });
    }
  });
  gsap.to('.content', {
    duration: 1, 
    opacity: 1, 
    y: -20, 
    ease: 'power2.out',
    onComplete: () => {
      ScrollTrigger.refresh();
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