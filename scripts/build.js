const browserSync = require('browser-sync').create();
const browserSyncConfig = require('./build-browser-sync.js');
const { copyAllFilesAndFolders } = require('./scripts/build-copy.js');


// Your custom actions here
console.log('Start Build');

// Run the copy process
copyAllFilesAndFolders();

// Start BrowserSync with the imported configuration
browserSync.init(browserSyncConfig, (err, bs) => {
  if (!err) {
    // Run your custom action after BrowserSync initialization
    console.log('After BrowserSync initialization!');
  }
});
