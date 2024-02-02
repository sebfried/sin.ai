import sharp from 'sharp';
import path from 'path'; 

// Configuration for source and target directories
const sourceDir = 'source/img/src';
const targetDir = 'source/img';

// Image configurations
const imagesConfig = [
  {
    source: 'cake.png', // sourceDir
    sizes: [200, 300], // width
    format: 'webp'
  },
  // Add additional images and sizes as needed
];

// Process each image configuration
async function processImages() {
  for (const config of imagesConfig) {
    const sourcePath = path.join(sourceDir, config.source);
    const baseName = path.basename(config.source, path.extname(config.source));
    let srcsetAttribute = '';

    // Retrieve dimensions of the source image
    const metadata = await sharp(sourcePath).metadata();
    const dimensions = { width: metadata.width, height: metadata.height };

    for (const size of config.sizes) {
      const targetFileName = `${baseName}-${size}.${config.format}`;
      const targetPath = path.join(targetDir, targetFileName);

      try {
        // Resize and convert image
        await sharp(sourcePath)
          .resize(size)
          .withMetadata() 
          .toFormat(config.format)
          .toFile(targetPath);

        console.log(`Generated ${targetPath}`);
        srcsetAttribute += `/img/${targetFileName} ${size}w, `;
      } catch (error) {
        console.error(`Failed to process ${config.source}:`, error);
      }
    }

    // Output HTML code for the image
    if (srcsetAttribute) {
      console.log(`<img src="/img/src/${config.source}" width="${dimensions.width}" height="${dimensions.height}" srcset="${srcsetAttribute.slice(0, -2)}">`);
    }
  }
}

processImages().then(() => console.log('Image processing complete.'));

// TODO: Wildcard selector for all images
// TODO: Default values (sizes, format)
// TODO: Format-specific output control (compression, ...)
// TODO: Resize only when necessary