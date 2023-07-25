const fs = require('fs-extra');
const path = require('path');

// Options
const sourceDir = 'source'; // Source directory
const distDir = 'docs'; // Destination directory
const foldersToCopy = [
  { source: 'folder1', destination: 'new-folder1' },
  { source: 'folder2', destination: 'new-folder2' },
  // Add more folder mappings here if needed
];
const fileTypesToCopy = ['.js', '.css']; // File types to copy

// Function to create empty folders
async function createEmptyFolders(folders) {
  try {
    for (const folder of folders) {
      const folderPath = path.join(distDir, folder);
      await fs.ensureDir(folderPath);
      console.log(`Empty folder created: ${folderPath}`);
    }
  } catch (err) {
    console.error('Error creating empty folders:', err);
  }
}

// Function to copy folders with content
async function copyFoldersWithContent(folders) {
  try {
    for (const folder of folders) {
      const sourcePath = path.join(sourceDir, folder.source);
      const destinationPath = path.join(distDir, folder.destination);
      await fs.copy(sourcePath, destinationPath);
      console.log(`Folder with content copied: ${sourcePath} -> ${destinationPath}`);
    }
  } catch (err) {
    console.error('Error copying folders with content:', err);
  }
}

// Function to copy single files
async function copySingleFiles(files) {
  try {
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(distDir, path.basename(file));
      await fs.copy(sourcePath, destinationPath);
      console.log(`Single file copied: ${sourcePath} -> ${destinationPath}`);
    }
  } catch (err) {
    console.error('Error copying single files:', err);
  }
}

// Function to copy multiple files with a certain file type
async function copyFilesByType(fileType) {
  try {
    const files = await fs.readdir(sourceDir);
    for (const file of files) {
      if (file.endsWith(fileType)) {
        const sourcePath = path.join(sourceDir, file);
        const destinationPath = path.join(distDir, file);
        await fs.copy(sourcePath, destinationPath);
        console.log(`File with type ${fileType} copied: ${sourcePath} -> ${destinationPath}`);
      }
    }
  } catch (err) {
    console.error(`Error copying files with type ${fileType}:`, err);
  }
}

// Main function to copy all files and folders
async function copyAllFilesAndFolders() {
  try {
    await createEmptyFolders(foldersToCopy);
    await copyFoldersWithContent(foldersToCopy);
    await copySingleFiles(['index.html', 'other-file.html']);
    for (const fileType of fileTypesToCopy) {
      await copyFilesByType(fileType);
    }
  } catch (err) {
    console.error('Error copying files and folders:', err);
  }
}

// If you want to call it separately from copy.build.js, you can do it
copyAllFilesAndFolders();

// Export the functions as modules
module.exports = {
    createEmptyFolders,
    copyFoldersWithContent,
    copySingleFiles,
    copyFilesByType,
    copyAllFilesAndFolders,
  };