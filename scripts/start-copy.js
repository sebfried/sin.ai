const fs = require('fs');
const path = require('path');

// temporary solution till fs-extra

const assetsToCopy = [
  { source: './node_modules/gsap/dist/gsap.min.js', destination: './source/vendor/gsap.min.js' },
  { source: './node_modules/gsap/dist/ScrollTrigger.min.js', destination: './source/vendor/ScrollTrigger.min.js' },
  { source: './node_modules/gsap/dist/Flip.min.js', destination: './source/vendor/Flip.min.js' },
  // Add more assets to copy here if needed
];

function copyAssets() {
  assetsToCopy.forEach((asset) => {
    fs.copyFile(asset.source, asset.destination, (err) => {
      if (err) {
        console.error(`Error copying ${asset.source} to ${asset.destination}:`, err);
      } else {
        console.log(`${asset.source} copied to ${asset.destination}`);
      }
    });
  });
}

copyAssets();

//TODO: test