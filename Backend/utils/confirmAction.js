const readline = require("readline");  // for reading from terminal

async function confirmAction(message) {
    const rl =
        readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

    return new Promise(
        (resolve) => {
            rl.question(
                message,
                (answer) => {
                    rl.close();

                    resolve(
                        answer
                            .trim()
                            .toLowerCase() === "y"
                    );
                }
            );
        }
    );
}

module.exports = {
    confirmAction,
};