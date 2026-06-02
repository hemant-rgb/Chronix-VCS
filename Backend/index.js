const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");




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
const mainRouter = require("./routes/main.router.js");

dotenv.config();

yargs(hideBin(process.argv))
    .command("start", "Server started", {}, startServer)
    .command("init", "Initialises a repository", {}, initRepo)
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


function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;
  
    app.use(express.json());

    const mongoURI = process.env.MONGODB_URI;
    mongoose.connect(mongoURI)
    .then(() => { console.log("connected to database") })
    .catch((err) => { console.log("error in connecting to db:", err) });
    
    app.use(cors({ origin : "*" })); //allowing all domain to access



    app.use("/",mainRouter);



    const httpServer = http.createServer(app);
    const io = new Server(httpServer,{         // socket allowing all to perform get and post requests
        cors:{    
            origin: "*",
            methods : ["GET","POST"],
        },
    });

    io.on("connection",(socket)=>{
        socket.on("joinRoom",(userId)=>{           //user joining with userId
            const user = userId;
            console.log("====");
            console.log(user);
            console.log("====");
            socket.join(user);
        });
    });

    const db = mongoose.connection;
    db.once("open",async()=>{
        console.log("CRUD");
    });

    httpServer.listen(port,()=>{
        console.log(`listining to port ${port}`);

    })


}