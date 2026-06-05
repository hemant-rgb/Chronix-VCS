const fs = require("fs").promises;
const path = require("path");

const supabase =
    require("../config/supabase-config");

const { initRepo } =
    require("./init.js");

const { downloadRecursive } =
    require("../utils/downloadRecursive.js");

async function cloneRepo(repoId) {

    try {

        // create local chronix structure
        await initRepo(repoId);

        const repoPath = path.join(
            process.cwd(),
            ".chronix"
        );

        // download remote HEAD
        const { data, error } =
            await supabase.storage
                .from("chronixBucket")
                .download(
                    `${repoId}/HEAD`
                );

        if (error) {
            throw error;
        }

        const latestCommitId =
            (await data.text()).trim();

        if (!latestCommitId) {
            throw new Error(
                "Remote HEAD is empty."
            );
        }

        // remote commit folder
        const remoteFolder =
            path.posix.join(
                repoId,
                "commits",
                latestCommitId
            );

        // local clone folder
        const clonePath =
            path.join(
                repoPath,
                "cloned",
                repoId,
                latestCommitId
            );

        await downloadRecursive(
            remoteFolder,
            clonePath
        );

        // update local HEAD
        await fs.writeFile(
            path.join(
                repoPath,
                "HEAD"
            ),
            latestCommitId
        );

        // update CURRENT
        await fs.writeFile(
            path.join(
                repoPath,
                "CURRENT"
            ),
            latestCommitId
        );

        console.log(
            `Repository ${repoId} cloned successfully`
        );

        console.log(
            `Latest commit: ${latestCommitId}`
        );

    } catch (err) {

        console.error(
            "Clone failed:",
            err.message
        );

    }
}

module.exports = {
    cloneRepo
};