const {
    removeAuth
} = require("../config/cli-config.js");

async function disconnectRepo() {

    await removeAuth();

    console.log(
        "Disconnected successfully"
    );
}

module.exports = {
    disconnectRepo
};