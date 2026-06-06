const supabase =
    require("../config/supabase-config");

async function getRepositoryFile(
    req,
    res
) {

    try {

        const repoId =
            req.params.id;

        const filePath =
            req.query.path;

        if (!filePath) {

            return res
                .status(400)
                .json({
                    message:
                        "Path is required"
                });

        }

        // Get HEAD

        const {
            data: headData,
            error: headError
        } =
            await supabase.storage
                .from("chronixBucket")
                .download(
                    `${repoId}/HEAD`
                );

        if (headError) {
            throw headError;
        }

        const latestCommitId =
            (
                await headData.text()
            ).trim();

        const fullPath =
            `${repoId}/commits/${latestCommitId}/${filePath}`;

        const {
            data,
            error
        } =
            await supabase.storage
                .from("chronixBucket")
                .download(
                    fullPath
                );

        if (error) {
            throw error;
        }

        const content =
            await data.text();

        res.json({
            content
        });

    } catch (err) {

        console.error(err);

        res.status(500)
            .json({
                message:
                    err.message
            });

    }
}

module.exports = {
    getRepositoryFile
};