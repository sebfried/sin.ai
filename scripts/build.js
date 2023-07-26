const browserSync = require('browser-sync').create();
const browserSyncConfig = require('./build-browser-sync.config.js');
const { execSync } = require('child_process');

// Start build
(function doBuild() {
  console.log('Start build');
  runPug();
  copyAll();
  processCSS();
  minifyJS();
  minifyHTML();
  console.log('Finished build');
  startBrowserSyncBuild();
})();

function runPug() {
  console.log('Starting Pug-to-HTML conversion.');
  try {
    // Execute the conversion script synchronously
    execSync('node scripts/common-pug.js', { stdio: 'inherit' });
    console.log('Pug-to-HTML conversion completed successfully.');

    // Call other build tasks or continue with your build process here.
  } catch (error) {
    console.error('Pug-to-HTML conversion failed:', error.message);
    // Handle the failure or terminate the build process accordingly.
  }
}

function copyAll() {
  console.log('Starting copy.');
  try {
    // Execute the conversion script synchronously
    execSync('node scripts/build-copy.js', { stdio: 'inherit' });

    // Call other build tasks or continue with your build process here.
  } catch (error) {
    console.error('Copy failed:', error.message);
    // Handle the failure or terminate the build process accordingly.
  }
}

function processCSS() {
  console.log('Starting CSS.');
  try {
    // Execute the conversion script synchronously
    execSync('node scripts/build-css.js', { stdio: 'inherit' });

    // Call other build tasks or continue with your build process here.
  } catch (error) {
    console.error('CSS failed:', error.message);
    // Handle the failure or terminate the build process accordingly.
  }
}

function minifyJS() {
  console.log('Starting JavaScript minification.');
  try {
    // Execute the conversion script synchronously
    execSync('node scripts/build-js.js', { stdio: 'inherit' });

    // Call other build tasks or continue with your build process here.
  } catch (error) {
    console.error('JavaScript minification failed:', error.message);
    // Handle the failure or terminate the build process accordingly.
  }
}

function minifyHTML() {
  console.log('Starting HTML minification.');
  try {
    // Execute the conversion script synchronously
    execSync('node scripts/build-html.js', { stdio: 'inherit' });

    // Call other build tasks or continue with your build process here.
  } catch (error) {
    console.error('HTML minification failed:', error.message);
    // Handle the failure or terminate the build process accordingly.
  }
}

function startBrowserSyncBuild() {
  // Start BrowserSync with the imported configuration
  browserSync.init(browserSyncConfig, (err, bs) => {
    if (!err) {
      // Run your custom action after BrowserSync initialization
      console.log('After BrowserSync initialization!');
    }
  });
}

