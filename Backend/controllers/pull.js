const fs = require("fs").promises;
const path = require("path");

const { resolveCommitId } = require("../utils/commitResolver");
const { downloadRecursive } = require("../utils/downloadRecursive.js");
const { requireAuth } = require("../utils/requireAuth.js");

async function pullRepo(commitId) {

  // CLI authentication 
  const auth =
    await requireAuth();

  if (!auth) {
    return;
  }
  try {

    const repoPath = path.resolve(
      process.cwd(),
      ".chronix"
    );

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

    if (!repoId) {
      console.log(
        "Repository is not linked to a remote repository."
      );
      return;
    }

    commitId = await resolveCommitId(
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
        repoId,
        "commits",
        commitId
      );

    const restorePath =
      path.join(
        repoPath,
        "pulled",
        commitId
      );

    await downloadRecursive(
      remoteFolder,
      restorePath
    );

    console.log(
      `Pulled commit ${commitId}`
    );

  } catch (err) {

    console.error(
      "Error pulling repository:",
      err.message
    );

  }
}

module.exports = {
  pullRepo
};