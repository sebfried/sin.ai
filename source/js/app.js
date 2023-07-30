// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu-bar a");

  function loadPage(url) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        document.querySelector(".content").innerHTML = html;
        fadeInContent();
      })
      .catch((error) => console.log("Error loading page:", error));
  }

  // Add click event listeners to the menu links
  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = link.getAttribute("href");
      loadPage(url);
    });
  });
});
