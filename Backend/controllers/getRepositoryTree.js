const supabase =
    require("../config/supabase-config.js");

const path =
    require("path");

const {
    buildFileTree
} =
    require("../utils/buildFileTree.js");

async function getRepositoryTree(
    req,
    res
) {

    try {

        const repoId =
            req.params.id;

        // Read HEAD

        const {
            data,
            error
        } =
            await supabase.storage
                .from("chronixBucket")
                .download(
                    `${repoId}/HEAD`
                );

        if (error) {

            return res
                .status(404)
                .json({
                    message:
                        "Repository not found"
                });

        }

        const latestCommitId =
            (
                await data.text()
            ).trim();

        // Empty repository

        if (!latestCommitId) {

            return res.json({
                commitId: null,
                tree: []
            });

        }

        const commitPath =
            path.posix.join(
                repoId,
                "commits",
                latestCommitId
            );

        const tree =
            await buildFileTree(
                commitPath
            );

        res.json({
            commitId:
                latestCommitId,

            tree
        });

    } catch (err) {

        console.error(
            "Error fetching tree:",
            err
        );

        res.status(500)
            .json({
                message:
                    err.message
            });

    }
}

module.exports = {
    getRepositoryTree
};