const fs = require("fs").promises;
const path = require("path");


const { uploadRecursive } = require("../utils/uploadRecursive.js");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".chronix");
  const commitsPath = path.join(repoPath, "commits");
  const configPath = path.join(
    repoPath,
    "config.json"
  );

  const config = JSON.parse(
    await fs.readFile(
      configPath,
      "utf-8"
    )
  );

  const repoId = config.repoId;

  try {

    if (!repoId) {
      console.log(
        "Repository is not linked to a remote repository."
      );
      return;
    }
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
          repoId,
          "commits",
          commitDir
        )
      );

    }
    // adding HEAD for tracking latest commit and so that we can clone latest commit
    const headPath = path.join(
      repoPath,
      "HEAD"
    );

    await uploadRecursive(
      headPath,

      path.posix.join(
        repoId,
        "HEAD"
      )
    );

    console.log("Push completed");

  } catch (err) {
    console.error("Error pushing to Supabase:", err.message);
  }
}

module.exports = { pushRepo };