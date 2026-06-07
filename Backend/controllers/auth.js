const readlineSync = require("readline-sync");
const axios = require("axios");

const {
    saveAuth
} = require("../config/cli-config.js");
const { API_URL } =
    require("../config/client-config");

async function authRepo() {

    try {

        const email =
            readlineSync.question(
                "Email: "
            );

        const password =
            readlineSync.question(
                "Password: ",
                {
                    hideEchoBack: true
                }
            );

        const response =
            await axios.post(
                `${API_URL}/login`,
                {
                    email,
                    password
                }
            );

        const {
            token,
            userId
        } = response.data;

        await saveAuth(
            token,
            userId
        );

        console.log(
            "Authentication successful"
        );

    } catch (err) {

        if (err.response) {

            console.log(
                err.response.data.message
            );

        } else {

            console.log(
                err.message
            );
        }
    }
}

module.exports = {
    authRepo
};