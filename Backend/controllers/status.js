const fs = require("fs").promises;
const path = require("path");

async function statusRepo() {
    const repoPath = path.resolve(
        process.cwd(),
        ".chronix"
    );

    const stagingPath = path.join(
        repoPath,
        "staging"
    );

    const headPath = path.join(
        repoPath,
        "HEAD"
    );

    const currentPath = path.join(
        repoPath,
        "CURRENT"
    );

    const configPath = path.join(
        repoPath,
        "config.json"
    );

    try {

        await fs.access(repoPath);

        let repoName = "Unknown";

        try {
            const config = JSON.parse(
                await fs.readFile(
                    configPath,
                    "utf-8"
                )
            );

            repoName =
                config.repoName ||
                "Unknown";
        }
        catch {
            console.log("Error in accesing Staged files");
        }

        const head = (
            await fs.readFile(
                headPath,
                "utf-8"
            )
        ).trim();

        const current = (
            await fs.readFile(
                currentPath,
                "utf-8"
            )
        ).trim();

        const stagedItems =
            await fs.readdir(
                stagingPath
            );

        console.log("\n=== Chronix Status ===\n");

        console.log(
            `Repository : ${repoName}`
        );

        console.log(
            `HEAD       : ${head || "None"
            }`
        );

        console.log(
            `CURRENT    : ${current || "None"
            }`
        );

        console.log("\nStaged Files:");

        if (
            stagedItems.length === 0
        ) {
            console.log(
                "  No files staged"
            );
        } else {
            stagedItems.forEach(
                (item) => {
                    console.log(
                        `  ${item}`
                    );
                }
            );
        }

        console.log();

    } catch (err) {

        console.log(
            "Not a Chronix repository."
        );

    }
}

module.exports = {
    statusRepo,
};