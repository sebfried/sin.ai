const fs = require('fs');
const path = require('path');
const htmlMinifier = require('html-minifier-terser');

const baseDirectory = 'docs';

function minifyHtmlFiles(dir) {
    dir = path.join(__dirname, '..', baseDirectory);
    fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            minifyHtmlFiles(filePath);
        } else if (file.isFile() && path.extname(file.name) === '.html') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const minified = htmlMinifier.minify(fileContent, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            });
            fs.writeFileSync(filePath, minified);
        }
    });
}

minifyHtmlFiles(baseDirectory);