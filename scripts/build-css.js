const fs = require('fs-extra');
const postcss = require('postcss');
const postcssConfig = require('./build-postcss.config.js');

async function copyAndMinifyCSS() {
  try {
    await fs.ensureDir('docs/css'); // Create the docs/css directory if it doesn't exist
    await fs.copy('source/css', 'docs/css', {
      filter: (src) => {
        return src.endsWith('.css');
      }
    });
    console.log('CSS files copied successfully.');

    // Process the CSS files in the docs/css directory using PostCSS with cssnano
    const cssFiles = await fs.readdir('docs/css');
    for (const file of cssFiles) {
      const inputPath = `docs/css/${file}`;
      const outputPath = `docs/css/${file}`;
      const css = await fs.readFile(inputPath, 'utf-8');
      const result = await postcss(postcssConfig.plugins).process(css, {
        from: inputPath,
        to: outputPath,
      });
      await fs.writeFile(outputPath, result.css);
    }

    console.log('CSS files minified successfully.');
  } catch (err) {
    console.error('Error copying and minifying CSS files:', err);
  }
}

copyAndMinifyCSS();
