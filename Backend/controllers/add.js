const fs = require("fs").promises;
const path = require("path");

const { copyRecursive } = require("../utils/copyRecursive.js");

async function addRepo(filePath) {
    const repoPath = path.resolve(
        process.cwd(),
        ".chronix"
    );

    const stagePath = path.join(
        repoPath,
        "staging"
    );

    try {
        await fs.mkdir(stagePath, {
            recursive: true,
        });

        const absolutePath =
            path.resolve(filePath);

        const relativePath =
            path.relative(
                process.cwd(),
                absolutePath
            );
        if (
            relativePath.startsWith("..")
        ) {

            console.log(
                "Cannot add files outside repository"
            );

            return;
        }

        const destination =
            path.join(
                stagePath,
                relativePath
            );

        await copyRecursive(
            absolutePath,
            destination
        );

        console.log(
            `${relativePath} added to staging area!`
        );

    } catch (err) {
        console.log(
            "Failed to stage:",
            err.message
        );
    }
}

module.exports = { addRepo };