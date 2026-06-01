const fs = require("fs").promises;
const path = require("path");


const { uploadRecursive } = require("../utils/uploadRecursive.js");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".chronix");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);

    if (commitDirs.length === 0) {
      console.log("No commits found to push.");
      return;
    }
    //  to select every folder and their every files 
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);

      await uploadRecursive(
        commitPath,

        path.posix.join(
          "commits",
          commitDir
        )
      );
      
    }

    console.log("Push completed");

  } catch (err) {
    console.error("Error pushing to Supabase:", err.message);
  }
}

module.exports = { pushRepo };