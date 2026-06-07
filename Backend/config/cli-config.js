const fs = require("fs").promises;
const path = require("path");
const os = require("os");

const CHRONIX_DIR = path.join(
    os.homedir(),
    ".chronix"
);
// for jwt token
const AUTH_FILE = path.join(
    CHRONIX_DIR,
    "auth.json"
);

async function saveAuth(token, userId) {
    console.log(AUTH_FILE);

    await fs.mkdir(
        CHRONIX_DIR,
        { recursive: true }
    );

    await fs.writeFile(
        AUTH_FILE,
        JSON.stringify(
            {
                token,
                userId
            },
            null,
            2
        )
    );
}

async function getAuth() {

    try {
        const data =
            await fs.readFile(
                AUTH_FILE,
                "utf-8"
            );

        return JSON.parse(data);

    } catch {

        return null;
    }
}

async function removeAuth() {

    try {

        await fs.unlink(
            AUTH_FILE
        );

    } catch(err) {
       console.log("failed to disconnect, err : ",err)
    }
}


module.exports = {
    saveAuth,
    getAuth,
    removeAuth

};