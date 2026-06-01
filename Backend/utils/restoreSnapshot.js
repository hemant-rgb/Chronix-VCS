const fs = require("fs").promises;
const path = require("path");

const {
    copyRecursive,
} = require("./copyRecursive.js");

async function restoreSnapshot(
    commitPath,
    rootPath
) {
    const items =
        await fs.readdir(
            commitPath
        );

    for (const item of items) {

        // skip metadata
        if (
            item === "commit.json"
        ) {
            continue;
        }

        await copyRecursive(
            path.join(
                commitPath,
                item
            ),
            path.join(
                rootPath,
                item
            )
        );
    }
}

module.exports = {
    restoreSnapshot
};