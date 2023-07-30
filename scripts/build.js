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
  await processCSS();
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


// const browserSync = require('browser-sync').create();
// const browserSyncConfig = require('./build-browser-sync.config.js');
// const { execSync } = require('child_process');
// const { displayAsciiArt } = require('./common-ascii-art');
// const { processCSS } = require('./build-css.js');

// const scripts = {
//   runPug: 'common-pug.js',
//   copyAll: 'build-copy.js',
//   purgeCSS: 'build-purgecss.js',
//   minifyJS: 'build-js.js',
//   minifyHTML: 'build-html.js'
// };

// // Start build
// (async function doBuild() {
//   await displayAsciiArt('Simple Rick´s');
//   console.log('Vanilla PWA Builder
// ')
//   executeScripts(scripts);
//   await processCSS();
//   console.log('Build finished!');
//   startBrowserSyncBuild();
// })();

// function executeScripts(scripts){
//   for(let [key, value] of Object.entries(scripts)){
//     console.log(`${key}()`);
//     try {
//       execSync(`node scripts/${value}`, { stdio: 'inherit' });
//     } catch (error) {
//       console.error(`${key}() failed:`, error.message);
//     }
//   }
// }

// function startBrowserSyncBuild() {
//   browserSync.init(browserSyncConfig, (err, bs) => {
//     if (!err) {
//       // Run custom action after BrowserSync initialization
//       console.log('Wubba lubba dub dub!');
//     }
//   });
// }


// ESM
// import { create as createBrowserSync } from 'browser-sync';
// import browserSyncConfig from './build-browser-sync.config.js';
// import { execSync } from 'child_process';
// import { displayAsciiArt } from './common-ascii-art';
// import { processCSS } from './build-css.js';

// const browserSync = createBrowserSync();
// const scripts = {
//   runPug: 'common-pug.js',
//   copyAll: 'build-copy.js',
//   purgeCSS: 'build-purgecss.js',
//   minifyJS: 'build-js.js',
//   minifyHTML: 'build-html.js'
// };

// // Start build
// (async function doBuild() {
//   await displayAsciiArt('Simple Rick´s');
//   console.log('Vanilla PWA Builder
// ')
//   executeScripts(scripts);
//   await processCSS();
//   console.log('Build finished!');
//   startBrowserSyncBuild();
// })();

// function executeScripts(scripts){
//   for(let [key, value] of Object.entries(scripts)){
//     console.log(`${key}()`);
//     try {
//       execSync(`node scripts/${value}`, { stdio: 'inherit' });
//     } catch (error) {
//       console.error(`${key}() failed:`, error.message);
//     }
//   }
// }

// function startBrowserSyncBuild() {
//   browserSync.init(browserSyncConfig, (err, bs) => {
//     if (!err) {
//       // Run custom action after BrowserSync initialization
//       console.log('Wubba lubba dub dub!');
//     }
//   });
// }
