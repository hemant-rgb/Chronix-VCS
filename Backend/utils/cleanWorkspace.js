// scope of improvement : protectedItems as of now should be having same rootPath , nesting is not possible as of now 


const fs = require("fs").promises;
const path = require("path");

async function cleanWorkspace(
    rootPath,
    protectedItems = []
) {
    const protectedSet =
        new Set(protectedItems);

    const items =
        await fs.readdir(rootPath);

    for (const item of items) {

        if (
            protectedSet.has(item)
        ) {
            continue;
        }

        await fs.rm(
            path.join(
                rootPath,
                item
            ),
            {
                recursive: true,
                force: true
            }
        );
    }
}

module.exports = {
    cleanWorkspace
};