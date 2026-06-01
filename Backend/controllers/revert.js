const fs = require("fs").promises;
const path = require("path");

const {
    resolveCommitId
} = require("../utils/commitResolver");

const {
    confirmAction
} = require("../utils/confirmAction");


const {
    restoreSnapshot
} = require("../utils/restoreSnapshot");

async function revertRepo(target) {

    const rootPath =
        process.cwd();

    const repoPath =
        path.join(
            rootPath,
            ".chronix"
        );

    const currentPath =
        path.join(
            repoPath,
            "CURRENT"
        );

    try {

        // resolve target commit
        const commitId =
            await resolveCommitId(
                target
            );

        if (!commitId) {
            console.log(
                "Commit not found."
            );
            return;
        }

        // warning confirmation
        const confirmed =
            await confirmAction(`
⚠ WARNING: Reverting will overwrite matching files
from the selected commit.

Effects:
• matching files may be overwritten
• unmatched files remain untouched
• current project structure is preserved

To return to latest state use:
node index.js revert latest

Continue? (y/n): `);

        if (!confirmed) {
            console.log(
                "Revert cancelled."
            );
            return;
        }

        const commitPath =
            path.join(
                repoPath,
                "commits",
                commitId
            );

        

        // restore snapshot
        await restoreSnapshot(
            commitPath,
            rootPath
        );

        // update CURRENT
        await fs.writeFile(
            currentPath,
            commitId
        );

        console.log(
            `Reverted successfully to commit ${commitId}`
        );

    } catch (err) {
        console.error(
            "Error reverting repository:",
            err
        );
    }
}

module.exports = {
    revertRepo
};