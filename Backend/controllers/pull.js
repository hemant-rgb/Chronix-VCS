const fs = require("fs").promises;
const path = require("path");


const { resolveCommitId } = require("../utils/commitResolver");

const { downloadRecursive } = require("../utils/downloadRecursive.js");
async function pullRepo(commitId) {
  try {
    commitId =
      await resolveCommitId(
        commitId
      );

    if (!commitId) {
      console.log(
        "Commit not found."
      );
      return;
    }

    const remoteFolder =
      path.posix.join(
        "commits",
        commitId
      );

    const restorePath =
      path.join(
        process.cwd(),
        ".chronix",
        "pulled",
        commitId
      );

    await downloadRecursive(
      remoteFolder,
      restorePath
    );

    console.log("Pull completed");
  } catch (err) {
    console.error(
      "Error pulling repository:",
      err.message
    );
  }
}

module.exports = { pullRepo };