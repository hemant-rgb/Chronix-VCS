const fs = require("fs").promises;
const path = require("path");

async function logRepo() {
  try {
    const commitsPath = path.join(
      process.cwd(),
      ".chronix",
      "commits"
    );

    const commitDirs =
      await fs.readdir(commitsPath);

    if (commitDirs.length === 0) {
      console.log("No commits found.");
      return;
    }

    const commits = [];

    for (const commitDir of commitDirs) {
      try {
        const commitJsonPath = path.join(
          commitsPath,
          commitDir,
          "commit.json"
        );

        const commitContent =
          await fs.readFile(
            commitJsonPath,
            "utf-8"
          );

        const commitData =
          JSON.parse(commitContent);

        commits.push(commitData);

      } catch (err) {
        console.error(
          `Skipping invalid commit ${commitDir}`
        );
      }
    }

    // newest first
    commits.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    console.log("\n===== Chronix Log =====\n");

    commits.forEach((commit, index) => {
      console.log(`[${index + 1}]`);

      console.log(
        `Message: ${commit.message}`
      );

      console.log(
        `CommitId: ${commit.commitId}`
      );

      console.log(
        `Time: ${new Date(
          commit.date
        ).toLocaleString()}`
      );

      console.log(
        "-------------------------"
      );
    });

  } catch (err) {
    console.error(
      "Error reading commit log:",
      err.message
    );
  }
}

module.exports = { logRepo };