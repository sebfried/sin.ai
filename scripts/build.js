const browserSync = require('browser-sync').create();
const browserSyncConfig = require('./build-browser-sync.config.js');
const { copyAllFilesAndFolders } = require('./build-copy.js');

// Start build
(function doBuild() {
  console.log('Start build');
  runPug();
  copyAllFilesAndFolders();
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

function startBrowserSyncBuild() {
  // Start BrowserSync with the imported configuration
  browserSync.init(browserSyncConfig, (err, bs) => {
    if (!err) {
      // Run your custom action after BrowserSync initialization
      console.log('After BrowserSync initialization!');
    }
  });
}

