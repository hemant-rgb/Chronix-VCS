const { getCommitHistory }=require("../utils/getCommitHistory.js");

async function getRepositoryCommits(
    req,
    res
) {

    try {

        const repoId =
            req.params.id;

        const commits =
            await getCommitHistory(
                repoId
            );

        res.json(
            commits
        );

    } catch (err) {

        console.error(
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
    getRepositoryCommits
};