const supabase =
    require("../config/supabase-config");

const path =
    require("path");

async function buildFileTree(
    remotePath
) {

    const {
        data,
        error
    } =
        await supabase.storage
            .from("chronixBucket")
            .list(remotePath);

    if (error) {
        throw error;
    }

    const tree = [];

    for (const item of data) {

        const currentPath =
            path.posix.join(
                remotePath,
                item.name
            );

        // folder
        if (
            item.metadata === null
        ) {

            tree.push({
                name:
                    item.name,
                type:
                    "folder",

                children:
                    await buildFileTree(
                        currentPath
                    )
            });

        }

        // file
        else {

            tree.push({
                name:
                    item.name,

                type:
                    "file"
            });

        }
    }

    return tree;
}

module.exports = {
    buildFileTree
};