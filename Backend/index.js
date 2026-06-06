const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");





const yargs = require("yargs");
// for taking arguments in commands we use hideBin
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init.js");
const { commitRepo } = require("./controllers/commit.js");
const { pullRepo } = require("./controllers/pull.js");
const { pushRepo } = require("./controllers/push.js");
const { addRepo } = require("./controllers/add.js");
const { revertRepo } = require("./controllers/revert.js");
const { logRepo } = require("./controllers/log.js");
const { statusRepo } = require("./controllers/status.js");
const { cloneRepo } = require("./controllers/clone.js");
const { startServer } = require("./server.js");
const mainRouter = require("./routes/main.router.js");

dotenv.config();

yargs(hideBin(process.argv))
    .command("start", "Server started", {}, startServer)
    .command("init", "Initialises a repository", {}, initRepo)
    .command("status", "Status of staged and unstaged files", {}, statusRepo)
    .command("add <file>", "Add file to repository", (yargs) => {
        yargs.positional("file", {
            description: "add file to staging area",
            type: "string"
        })
    }, (argv) => {
        addRepo(argv.file);        // argv will contain file that has to be passed to staging area 
    })
    .command("commit <message>", "Commit file to repository", (yargs) => {
        yargs.positional("message", {
            description: "commit file to staging area",
            type: "string"
        })
    }, (argv) => {
        commitRepo(argv.message);
    })
    .command("log", "Show commit history", {}, () => {
        logRepo();
    }
    )
    .command("push", "Push commits to Supabase", {}, pushRepo)
    .command(
        "pull [target]",      // target -> latest , previous , commitId , or even number
        "Pull commit from repository",
        (yargs) => {
            yargs.positional("target", {
                description:
                    "commitId | latest | previous | number",
                type: "string",
            });
        },
        (argv) => {
            pullRepo(argv.target);
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
        (argv) => {
            cloneRepo(
                argv.repoId
            );
        }
    )
    .command("revert [target]",
        "Revert back to specific commit",
        (yargs) => {
            yargs.positional("target", {
                description: "commitId | latest | previous | number",
                type: "string"
            });
        },
        (argv) => {
            revertRepo(argv.target);
        }
    ).demandCommand(1, "you need at least one command").help().parse();


