const simpleGit = require('simple-git');
const git = simpleGit(); // Initialize a SimpleGit instance in the current directory

// Define the builder repository's remote URL and target branch
const builderRemoteUrl = 'url_for_builder_repository';
const builderTargetBranch = 'main'; // Change this to your target branch

(async () => {
  try {
    // Change the remote URL for the builder repository
    await git.remote(['set-url', 'origin', builderRemoteUrl]);

    // Pull the latest updates from the remote repository
    await git.pull('origin', builderTargetBranch);

    console.log('Builder updated successfully.');
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
})();

// TODO: Temporary .gitignore for /source and /docs (do not pull)