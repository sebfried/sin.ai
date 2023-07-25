const browserSync = require('browser-sync').create();
const browserSyncConfig = require('./start.browser-sync.js');
const { execSync } = require('child_process');

// Watch for changes in the pug files
browserSync.watch('source/**/**/**/*.pug').on('change', function (event) {
  runPug();
});

function runPug() {
  console.log('Starting Pug-to-HTML conversion.');
  try {
    // Execute the conversion script synchronously
    execSync('node scripts/pug.js', { stdio: 'inherit' });
    console.log('Pug-to-HTML conversion completed successfully.');

    // Call other build tasks or continue with your build process here.
  } catch (error) {
    console.error('Pug-to-HTML conversion failed:', error.message);
    // Handle the failure or terminate the build process accordingly.
  }
}

function doStart() {
  runPug();
}

// Your custom actions here
console.log('Before BrowserSync initialization!');

doStart();

// Start BrowserSync with the imported configuration
browserSync.init(browserSyncConfig, (err, bs) => {
  if (!err) {
    // Run your custom action after BrowserSync initialization
    console.log('After BrowserSync initialization!');
  }
});
