const supabase =
    require("../config/supabase-config");

const path =
    require("path");

async function getCommitHistory(
    repoId
) {

    const commitsPath =
        path.posix.join(
            repoId,
            "commits"
        );

    const {
        data: commits,
        error
    } =
        await supabase.storage
            .from("chronixBucket")
            .list(commitsPath);

    if (error) {
        throw error;
    }

    const history = [];

    for (const commit of commits) {

        try {

            const commitJsonPath =
                path.posix.join(
                    commitsPath,
                    commit.name,
                    "commit.json"
                );

            const {
                data,
                error
            } =
                await supabase.storage
                    .from("chronixBucket")
                    .download(
                        commitJsonPath
                    );

            if (error) {
                continue;
            }

            const content =
                await data.text();

            const commitData =
                JSON.parse(
                    content
                );

            history.push(
                commitData
            );

        } catch {

            continue;

        }
    }

    history.sort(
        (a, b) =>
            new Date(
                b.date
            ) -
            new Date(
                a.date
            )
    );

    return history;
}

module.exports = {
    getCommitHistory
};