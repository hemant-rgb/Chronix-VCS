const fs = require("fs").promises;
const path = require("path");

async function copyRecursive(
    source,
    destination
) {
    const stat =
        await fs.stat(source);

    // file
    if (stat.isFile()) {
        await fs.mkdir(
            path.dirname(destination),
            {
                recursive: true,
            }
        );

        await fs.copyFile(
            source,
            destination
        );

        return;
    }

    // folder
    await fs.mkdir(
        destination,
        {
            recursive: true,
        }
    );

    const items =
        await fs.readdir(source);

    for (const item of items) {
        await copyRecursive(
            path.join(source, item),
            path.join(destination, item)
        );
    }
}

module.exports = {
    copyRecursive
};