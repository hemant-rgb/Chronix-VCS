const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const API_URL =
    process.env.API_URL;

const supabase =
    require("../config/supabase-config");

const { initRepo } =
    require("./init.js");

const { downloadRecursive } =
    require("../utils/downloadRecursive.js");

async function cloneRepo(repoId) {

    try {

        // Fetch repository metadata
        const response =
            await axios.get(
                `${API_URL}/repo/${repoId}`
            );

        const repoName =
            response.data.name;

        // Create clones directory
        const clonesDir =
            path.join(
                process.cwd(),
                "clones"
            );

        await fs.mkdir(
            clonesDir,
            {
                recursive: true
            }
        );

        // Clone folder name
        let cloneRoot =
            path.join(
                clonesDir,
                repoName
            );

        // Handle duplicate names
        try {

            await fs.access(
                cloneRoot
            );

            cloneRoot =
                path.join(
                    clonesDir,
                    `${repoName}-${repoId.slice(0, 6)}`
                );

        } catch {
            // Folder does not exist
        }

        await fs.mkdir(
            cloneRoot,
            {
                recursive: true
            }
        );

        // Move into cloned repository
        process.chdir(
            cloneRoot
        );

        // Create .chronix
        await initRepo(
            repoId
        );

        const repoPath =
            path.join(
                cloneRoot,
                ".chronix"
            );

        // Download HEAD
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
            (
                await data.text()
            ).trim();

        // Empty repository
        if (!latestCommitId) {

            console.log(
                "Repository has no commits yet."
            );

            console.log(
                `Empty repository cloned at:`
            );

            console.log(
                cloneRoot
            );

            return;
        }

        // Remote latest commit
        const remoteFolder =
            path.posix.join(
                repoId,
                "commits",
                latestCommitId
            );

        // Workspace folder
        const workspacePath =
            path.join(
                cloneRoot,
                "workspace"
            );

        await fs.mkdir(
            workspacePath,
            {
                recursive: true
            }
        );

        // Download latest snapshot
        await downloadRecursive(
            remoteFolder,
            workspacePath
        );

        // Update HEAD
        await fs.writeFile(
            path.join(
                repoPath,
                "HEAD"
            ),
            latestCommitId
        );

        // Update CURRENT
        await fs.writeFile(
            path.join(
                repoPath,
                "CURRENT"
            ),
            latestCommitId
        );

        console.log(
            `Repository '${repoName}' cloned successfully`
        );

        console.log(
            `Latest commit: ${latestCommitId}`
        );

        console.log(
            `Location: ${cloneRoot}`
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