const browserSync = require('browser-sync').create();
const browserSyncConfig = require('./browsersync.build.js');

// Your custom actions here
console.log('Before BrowserSync initialization!');

// Start BrowserSync with the imported configuration
browserSync.init(browserSyncConfig, (err, bs) => {
  if (!err) {
    // Run your custom action after BrowserSync initialization
    console.log('After BrowserSync initialization!');
  }
});
