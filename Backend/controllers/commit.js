const fs = require('fs').promises;
const path = require('path');


const { v4: uuidv4 } = require('uuid');


const { copyRecursive } = require("../utils/copyRecursive.js");


async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".chronix");
    const stagePath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try {

        const files = await fs.readdir(stagePath);
        // prevent empty commit
        if (files.length === 0) {
            console.log(
                "Nothing to commit."
            );
            return;
        }

        const commitId = uuidv4();
        const commitDir = path.join(commitPath, commitId);
        await fs.mkdir(commitDir, { recursive: true });
        for (const file of files) {
            await copyRecursive(path.join(stagePath, file), path.join(commitDir, file));
        };

        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({ commitId, message, date: new Date().toISOString() }, null, 2));
        // adding most recent commit to HEAD folder of repo for accessing the latest commit
        const headPath = path.join(repoPath, "HEAD");
        const currentPath = path.join(repoPath, "CURRENT");
        await fs.writeFile(headPath, commitId);
        await fs.writeFile(currentPath, commitId);
        // removing files and folders from staging area
        for (const file of files) {
            await fs.rm(
                path.join(stagePath, file),
                {
                    recursive: true,
                    force: true
                }
            );
        }
        // we also store the message and date when commit was made
        console.log(`Commit ${commitId} created with message ${message}`);

    } catch (err) {
        console.error("Error committing file : ", err);
    }
}

module.exports = { commitRepo };