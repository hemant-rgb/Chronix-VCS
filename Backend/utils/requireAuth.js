const { getAuth } = require("../config/cli-config.js");

async function requireAuth() {

    const auth =
        await getAuth();

    if (!auth) {

        console.log(
            "You are not authenticated."
        );

        console.log(
            "Run: node index.js auth"
        );

        return null;
    }

    return auth;
}

module.exports = {
    requireAuth
};