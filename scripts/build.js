const browserSync = require('browser-sync').create();
const browserSyncConfig = require('./build-browser-sync.config.js');
const { execSync } = require('child_process');
const { displayAsciiArt } = require('./common-ascii-art');
const { processCSS } = require('./build-css.js');

// Start build
(async function doBuild() {
  await displayAsciiArt('Simple Rick´s');
  console.log('Vanilla PWA Builder\n')
  runPug();
  copyAll();
  postCSS();
  purgeCSS();
  minifyJS();
  minifyHTML();
  console.log('Build finished!');
  startBrowserSyncBuild();
})();

function runPug() {
  console.log('runPug()');
  try {
    execSync('node scripts/common-pug.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('runPug() failed:', error.message);
  }
}

function copyAll() {
  console.log('copyAll()');
  try {
    execSync('node scripts/build-copy.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('copyAll() failed:', error.message);
  }
}

function postCSS() {
  console.log('processCSS()');
  try {
    processCSS();
  } catch (error) {
    console.error('processCSS() failed:', error.message);
  }
}

function purgeCSS() {
  console.log('purgeCSS()');
  try {
    execSync('node scripts/build-purgecss.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('purgeCSS() failed:', error.message);
  }
}

function minifyJS() {
  console.log('minifyJS()');
  try {
    execSync('node scripts/build-js.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('minifyJS() failed:', error.message);
  }
}

function minifyHTML() {
  console.log('minifyHTML()');
  try {
    execSync('node scripts/build-html.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('minifyHTML() failed:', error.message);
  }
}

function startBrowserSyncBuild() {
  browserSync.init(browserSyncConfig, (err, bs) => {
    if (!err) {
      // Run custom action after BrowserSync initialization
      console.log('Wubba lubba dub dub!');
    }
  });
}