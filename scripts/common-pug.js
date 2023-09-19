const fs = require('fs');
const path = require('path');
const pug = require('pug');

const sourceDirectory = path.join(__dirname, '..', 'source');
const options = {
    basedir: "source",
    pretty: true
};

function needsConversion(pugFilePath, htmlFilePath) {
  try {
    const pugStats = fs.statSync(pugFilePath);
    const htmlStats = fs.statSync(htmlFilePath);

    return pugStats.mtimeMs > htmlStats.mtimeMs;
  } catch (error) {
    // If there's an error (e.g., file doesn't exist), we need to perform the conversion
    return true;
  }
}

function convertPugToHTML(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // If the file is a directory, recursively convert its content
        convertPugToHTML(filePath);
      } else if (path.extname(file) === '.pug') {
        // If the file is a .pug file, convert it to .html only if necessary
        const htmlFileName = path.basename(file, '.pug') + '.html';
        const htmlFilePath = path.join(directoryPath, htmlFileName);

        if (needsConversion(filePath, htmlFilePath)) {
          const pugSource = fs.readFileSync(filePath, 'utf8');
          options.filename = filePath;

          try {
            const html = pug.render(pugSource, options);

            fs.writeFileSync(htmlFilePath, html, 'utf8');
            console.log(`Converted ${filePath} to ${htmlFilePath}`);
          } catch (renderError) {
            console.error(`Error rendering ${filePath}:`, renderError);
          }
        } else {
          console.log(`Skipped ${filePath} (HTML file is up to date)`);
        }
      }
    });
  });
}

convertPugToHTML(sourceDirectory);
