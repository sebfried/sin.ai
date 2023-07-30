## Project Info

this is going to be a fancy website to view and download wallpapers. 

## Project Structure

- source/ # base directory for the server "/"
    - css/
        - *.css
    - img/
        - art/
            - 1.png # low resolution image for home page, with higher compression
            - 1hd.png # high resolution image for sub page, with lower compression
            - 2.png
            - 2hd.png
            - 3.png
            - ...
            - 10.png
        - icons/
    - js/
        - app.js # code for all pages
        - index.js # code for index.html
        - wallpaper.js # code for wallpaper download pages
    - vendor/
        - gsap.min.js
        - ScrollTrigger.min.js
        - *.js
        - *.css
    - index.html
    - 1.html # sub page 1 # all sub pages are wallpaper download pages
    - 2.html # sub page 2
    - 3.html # sub page 3
    - ...
    - 10.html # sub page 10

## index.html

```html

<body>
  <div class="menu-bar"><a href="/">Home</a></div>
  <div class="content">
    <div class="image-column">
      <a id="_6" href="/6.html">
        <img src="/img/art/6.png" class="art" alt="">
      </a>
      <a id="_5" href="/5.html">
        <img src="/img/art/5.png" class="art" alt="">
      </a>
      <a id="_4" href="4.html">
        <img src="/img/art/4.png" class="art" alt="">
      </a>
      <a id="_3" href="3.html">
        <img src="/img/art/3.png" class="art" alt="">
      </a>
      <a id="_2" href="2.html">
        <img src="/img/art/2.png" class="art" alt="">
      </a>
      <a id="_1" href="1.html">
        <img src="/img/art/1.png" class="art" alt="">
      </a>
    </div>
  </div>
  <script src="/vendor/gsap.min.js"></script>
  <script src="/vendor/ScrollTrigger.min.js"></script>
  <script src="/js/app.js"></script>
  <script src="/js/index.js"></script>
</body>

```

## 1.html

```html

<body>
    <div class="menu-bar"><a href="/">Home</a></div>
    <div class="content">
        <div class="image-container">
            <div class="pulsating-overlay"></div>
            <img src="/img/art/1hd.png" class="art" alt="">
        </div>
        <div clas="image-info">
            <h2>Image Name</h2>
            <p>Other infos about the image.</p>
        </div>
    </div>
    <script src="/vendor/gsap.min.js"></script>
    <script src="/vendor/ScrollTrigger.min.js"></script>
    <script src="/js/app.js"></script>
    <script src="/js/wallpaper.js"></script>
</body>

```

## css/style.css

```css

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: black;
}

.image-column {
  display: flex;
  flex-direction: column;
  align-items: center; /* Optional: Center the images horizontally */
  width: 1000px;
  margin: 0 auto;
}

.image-column img {
  max-width: 100%;
}

```

## js/index.js

```js

// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", function () {
    // Get all the images in the column
    const images = document.querySelectorAll(".image-column img");

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

```

## your role

you are a senior web developer and designer, producing a production ready code.
you love web development and design and your most important goal is to create websites the users love to use.
you write clear, elegant and perfect code, with great explanations for console logs, for other developers in the team. the logs and comments will later be removed in the build process.
your most important goal is to write very good code, like your life depends on it, that is easy to understand and to reuse, with small and elegant functions. 
your code is so good, because you love your job.

## clarifications about the project

## the big picture

we need the website to work with and without javascript.
we need nice and pleasant animations for the user, if javscript is activated, so that the user enjoys using the website. 

don't create everything now, just the next step.

## the next step

the home page will be quite large, with a lot of images, so we need lazy loading. the menu bar is there from the beginning, the background is black. there is a simple css animation as loading indicator in the middle, something like a smooth pulsating circle. as soon as everything in the viewport is loaded, the content fades in. use as much gsap as possible.


remember that the whole site should work great for users without javascript.
do not create the code right now, but ask questions to clarify.

------

all animations and smooth transitions are done with gsap.
we want smooth transitions to the sub page, when a user clicks on an image.
when the user goes from a sub page to the home page, there is a also a smooth transition.


i have a website with one home page and multiple sub pages in a folder. all html. on the home page, there are multiple images. 

when one is clicked, it should move to the top of the page, the position where it will be on the sub page, and there should be a smooth transition to the sub page, everything but the image and the menu bar should fade out and the sub page content should fade in. 

for animations, we use gsap. it is very important, for multiple reasons, that the page works without javascript as expected, and that the animations are just an overlay. each image on the home page has an id. 

the browser forward and back buttons should work with and without javascript, as expected. dont create code now, but ask me some questions to clarify and give me the best options to build such a functionality