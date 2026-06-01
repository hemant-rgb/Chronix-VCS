const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".chronix");

    const stagingPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");
  
    const pulledPath = path.join(repoPath, "pulled");

    const headPath = path.join(repoPath, "HEAD");
    const currentPath = path.join(repoPath, "CURRENT");

    try {
        // create .chronix folder structure
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(stagingPath, { recursive: true });
        await fs.mkdir(commitPath, { recursive: true });
        
        await fs.mkdir(pulledPath, { recursive: true });

        // config file
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify(
                {
                    bucket: process.env.SUPABASE_BUCKET || "chronixBucket",
                },
                null,
                2
            )
        );

        // HEAD -> latest commit pointer
        await fs.writeFile(headPath, "");

        // CURRENT -> currently checked-out snapshot
        await fs.writeFile(currentPath, "");

        console.log("Repository initialized successfully");
    } catch (err) {
        console.log("Error initializing repository:", err);
    }
}

module.exports = { initRepo };