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

        const itemName =
            path.basename(absolutePath);

        const destination =
            path.join(
                stagePath,
                itemName
            );

        await copyRecursive(
            absolutePath,
            destination
        );

        console.log(
            `${itemName} added to staging area!`
        );

    } catch (err) {
        console.log(
            "Failed to stage:",
            err.message
        );
    }
}

module.exports = { addRepo };