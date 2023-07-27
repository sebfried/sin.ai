const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { JSDOM } = require('jsdom');

// ... rest of the code from build-css.js ...

// Export the processCSS function
module.exports.processCSS = processCSS;
