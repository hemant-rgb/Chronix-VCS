#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
require("dotenv").config();

yargs(hideBin(process.argv))
    .scriptName("chronix")

    .command(
        "start",
        "Server started",
        {},
        async () => {
            const {
                startServer
            } = require("./server.js");

            await startServer();
        }
    )

    .command(
        "auth",
        "Authenticate with Chronix",
        {},
        async () => {
            const {
                authRepo
            } = require("./controllers/auth.js");

            await authRepo();
        }
    )

    .command(
        "disconnect",
        "Disconnect current user",
        {},
        async () => {
            const {
                disconnectRepo
            } = require("./controllers/disconnect.js");

            await disconnectRepo();
        }
    )

    .command(
        "init",
        "Initialises a repository",
        {},
        async () => {
            const {
                initRepo
            } = require("./controllers/init.js");

            await initRepo();
        }
    )

    .command(
        "status",
        "Status of staged and unstaged files",
        {},
        async () => {
            const {
                statusRepo
            } = require("./controllers/status.js");

            await statusRepo();
        }
    )

    .command(
        "add <file>",
        "Add file to repository",
        (yargs) => {
            yargs.positional(
                "file",
                {
                    description:
                        "add file to staging area",
                    type: "string"
                }
            );
        },
        async (argv) => {
            const {
                addRepo
            } = require("./controllers/add.js");

            await addRepo(
                argv.file
            );
        }
    )

    .command(
        "commit <message>",
        "Commit file to repository",
        (yargs) => {
            yargs.positional(
                "message",
                {
                    description:
                        "commit message",
                    type: "string"
                }
            );
        },
        async (argv) => {
            const {
                commitRepo
            } = require("./controllers/commit.js");

            await commitRepo(
                argv.message
            );
        }
    )

    .command(
        "log",
        "Show commit history",
        {},
        async () => {
            const {
                logRepo
            } = require("./controllers/log.js");

            await logRepo();
        }
    )

    .command(
        "push",
        "Push commits to Supabase",
        {},
        async () => {
            const {
                pushRepo
            } = require("./controllers/push.js");

            await pushRepo();
        }
    )

    .command(
        "pull [target]",
        "Pull commit from repository",
        (yargs) => {
            yargs.positional(
                "target",
                {
                    description:
                        "commitId | latest | previous | number",
                    type: "string"
                }
            );
        },
        async (argv) => {
            const {
                pullRepo
            } = require("./controllers/pull.js");

            await pullRepo(
                argv.target
            );
        }
    )

    .command(
        "clone <repoId>",
        "Clone repository",
        (yargs) => {
            yargs.positional(
                "repoId",
                {
                    type: "string"
                }
            );
        },
        async (argv) => {
            const {
                cloneRepo
            } = require("./controllers/clone.js");

            await cloneRepo(
                argv.repoId
            );
        }
    )

    .command(
        "revert [target]",
        "Revert back to specific commit",
        (yargs) => {
            yargs.positional(
                "target",
                {
                    description:
                        "commitId | latest | previous | number",
                    type: "string"
                }
            );
        },
        async (argv) => {
            const {
                revertRepo
            } = require("./controllers/revert.js");

            await revertRepo(
                argv.target
            );
        }
    )

    .demandCommand(
        1,
        "you need at least one command"
    )
    .help()
    .parse();