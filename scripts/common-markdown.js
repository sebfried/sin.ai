const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

// Configure markdown-it
const md = new MarkdownIt({
    html: false,
    xhtmlOut: false,
    breaks: false,
    linkify: false,
    typographer: false
});

const sourceDirectory = path.join(__dirname, '..', 'source');

// Specify folders and files to exclude
const foldersToProcess = ['markdown']; 
const excludeFiles = ['readme.md','Readme.md','README.md']; 

function needsConversion(mdFilePath, htmlFilePath) {
    try {
        const mdStats = fs.statSync(mdFilePath);
        const htmlStats = fs.statSync(htmlFilePath);

        return mdStats.mtimeMs > htmlStats.mtimeMs;
    } catch (error) {
        // If there's an error (e.g., file doesn't exist), we need to perform the conversion
        return true;
    }
}

function convertMdToHTML(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directoryPath}:`, err);
            return;
        }

        files.forEach((file) => {
            if (excludeFiles.includes(file)) {
                // Skip excluded files
                return;
            }

            const filePath = path.join(directoryPath, file);

            if (path.extname(file) === '.md') {
                const htmlFileName = path.basename(file, '.md') + '.md.html';
                const htmlFilePath = path.join(directoryPath, htmlFileName);

                if (needsConversion(filePath, htmlFilePath)) {
                    const mdContent = fs.readFileSync(filePath, 'utf8');

                    try {
                        const htmlContent = md.render(mdContent);
                        fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
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

// Process each specified folder
foldersToProcess.forEach(folder => {
    const fullPath = path.join(sourceDirectory, folder);
    convertMdToHTML(fullPath);
});
