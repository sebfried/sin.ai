// git-push-builder.js
const { exec, writeFile, readFile, unlink } = require('fs').promises;
const { promisify } = require('util');
const execAsync = promisify(require('child_process').exec);

// Define the builder repository's remote URL and target branch
const builderRemoteUrl = 'url_for_builder_repository';
const builderTargetBranch = 'main'; // Change this to your target branch

// Define temporary .gitignore content
const temporaryGitignoreContent = `
# Temporary .gitignore content
temporary/
`;

// Get the root directory path where package.json is located
const rootDirectory = `${__dirname}/..`; // Assumes the script is in the "scripts" directory

(async function () {
  let originalSiteRemoteUrl, originalSiteTargetBranch, originalGitignoreContent;
  let success = false;

  try {
    // Retrieve the original remote URL and target branch for the site repository
    const originalRemoteUrlCommand = `git config --get remote.origin.url`;
    const originalTargetBranchCommand = `git rev-parse --abbrev-ref HEAD`;

    originalSiteRemoteUrl = (await exec(originalRemoteUrlCommand, { cwd: rootDirectory })).stdout.trim();
    originalSiteTargetBranch = (await exec(originalTargetBranchCommand, { cwd: rootDirectory })).stdout.trim();

    // Change to the target branch for the builder repository
    await execAsync(`git checkout ${builderTargetBranch}`, { cwd: rootDirectory });

    // Change the remote URL for the builder repository
    await execAsync(`git remote set-url origin ${builderRemoteUrl}`, { cwd: rootDirectory });

    // Temporarily overwrite .gitignore
    originalGitignoreContent = await readFile(`${rootDirectory}/.gitignore`, 'utf8');
    await writeFile(`${rootDirectory}/.gitignore.original`, originalGitignoreContent); // Backup original .gitignore
    await writeFile(`${rootDirectory}/.gitignore`, temporaryGitignoreContent);

    // Perform Git fetch, push, and other operations for the builder
    // ...

    // Add the git commit and push commands
    const dateTime = new Date().toISOString(); // Get current date and time
    await execAsync(`git add .`, { cwd: rootDirectory }); // Stage changes
    await execAsync(`git commit -m "Builder update at ${dateTime}"`, { cwd: rootDirectory }); // Commit with date and time
    await execAsync(`git push origin ${builderTargetBranch}`, { cwd: rootDirectory }); // Push

    // Set success flag to true
    success = true;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  } finally {
    // Restore the original .gitignore
    if (originalGitignoreContent) {
      await restoreOriginalGitignore();
    }

    // Restore the original remote URL and branch for the site repository
    if (success) {
      await execAsync(`git remote set-url origin ${originalSiteRemoteUrl}`, { cwd: rootDirectory });
      await execAsync(`git checkout ${originalSiteTargetBranch}`, { cwd: rootDirectory });
    }
  }
})();

async function restoreOriginalGitignore() {
  try {
    const originalGitignoreContent = await readFile(`${rootDirectory}/.gitignore.original`, 'utf8');
    await writeFile(`${rootDirectory}/.gitignore`, originalGitignoreContent);
    await unlink(`${rootDirectory}/.gitignore.original`);
  } catch (error) {
    console.error(`Error restoring the original .gitignore: ${error}`);
  }
}
