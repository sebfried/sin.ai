const fs = require('fs');
const path = require('path');
const Sitemap = require('sitemap');

// Configuration
const domain = 'https://sin.ai'; // Replace with your domain
const outputDir = path.join(__dirname, '..', 'source'); // Output directory
const subfolders = []; // Specify subfolders, if any

const urls = [];

// Function to crawl a directory and add URLs to the sitemap
function crawlDirectory(directory, baseUrl) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      crawlDirectory(filePath, baseUrl);
    } else if (file.endsWith('.html')) {
      // Remove the .html extension
      const relativePath = path.relative(outputDir, filePath).replace('.html', '');
      urls.push({ url: path.join(baseUrl, relativePath) });
    }
  }
}

// Add root URLs
crawlDirectory(outputDir, domain);

// Add subfolder URLs
for (const subfolder of subfolders) {
  crawlDirectory(path.join(outputDir, subfolder), path.join(domain, subfolder));
}

// Create sitemap
const sitemap = Sitemap.buildSitemap({
  urls,
});

// Save sitemap to a file
const sitemapPath = path.join(outputDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap.toString());

console.log(`Sitemap generated and saved to ${sitemapPath}`);
