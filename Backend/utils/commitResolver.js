const fs = require("fs").promises;
const path = require("path");

const headPath = path.join(process.cwd(), ".chronix", "HEAD");

async function resolveCommitId(target) {
    

    const commitsPath = path.join(
        process.cwd(),
        ".chronix",
        "commits"
    );

    const commitDirs =
        await fs.readdir(commitsPath);

    const commits = [];

    for (const commitDir of commitDirs) {

        try {

            const commitJsonPath =
                path.join(
                    commitsPath,
                    commitDir,
                    "commit.json"
                );

            const content =
                await fs.readFile(
                    commitJsonPath,
                    "utf-8"
                );

            const commit =
                JSON.parse(content);

            commits.push(commit);

        } catch {
            continue;
        }
    }

    // newest first (for latest commit)
    commits.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );

    // latest
    if (
        !target ||
        target === "latest"
    ) {
        try {
            const headCommitId =
                await fs.readFile(
                    headPath,
                    "utf-8"
                );
            

            return headCommitId.trim();    

        } catch {
            return commits[0]
                ?.commitId;
        }
    }

    // previous
    if (target === "previous") {
        return commits[1]?.commitId;
    }

    // nth commit
    if (!isNaN(target)) {

        const index =
            Number(target) - 1;

        return commits[index]
            ?.commitId;
    }

    // assume commitId
    return target;
}

module.exports = {
    resolveCommitId
};