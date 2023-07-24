var images = document.getElementsByTagName('img');
var lastScrollY = window.scrollY;
var ticking = false;

function update() {
  var currentScrollY = window.scrollY;
  var delta = currentScrollY - lastScrollY;

  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    var position = image.getBoundingClientRect();
    if (position.top < window.innerHeight && position.bottom >= 0) {
      var percent = (position.top + position.height / 2) / (window.innerHeight / 2);
      image.style.width = (200 + percent * 200) + 'px';
      image.style.filter = 'grayscale(' + (100 - percent * 100) + '%)';
    }
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);
