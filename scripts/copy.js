const fs = require('fs');
const path = require('path');

const sourceFolder = 'node_modules';
const destinationFolder = 'source/vendor';

const assetsToCopy = [
  { source: 'gsap/dist/gsap.min.js', destination: 'gsap.min.js' },
  // Add more assets to copy here if needed
  // { source: 'source-folder/file-to-copy.js', destination: 'destination-folder/copied-file.js' },
];

function copyAssets() {
  assetsToCopy.forEach((asset) => {
    const sourcePath = path.join(__dirname, '..', sourceFolder, asset.source);
    const destinationPath = path.join(__dirname, '..', destinationFolder, asset.destination);

    fs.copyFile(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`Error copying ${asset.source} to ${asset.destination}:`, err);
      } else {
        console.log(`${asset.source} copied to ${asset.destination}`);
      }
    });
  });
}

copyAssets();
