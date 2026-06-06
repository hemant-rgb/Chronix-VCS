const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const http = require("http");
// const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router.js");


dotenv.config();
async function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    const mongoURI = process.env.MONGODB_URI;
    mongoose.connect(mongoURI)
        .then(() => { console.log("connected to database") })
        .catch((err) => { console.log("error in connecting to db:", err) });

    app.use(cors({ origin: "*" })); //allowing all domain to access



    app.use("/", mainRouter);



    // const httpServer = http.createServer(app);
    // const io = new Server(httpServer, {         
    //     cors: {
    //         origin: "*",
    //         methods: ["GET", "POST"],
    //     },
    // });

    // io.on("connection", (socket) => {
    //     socket.on("joinRoom", (userId) => {           //user joining with userId
    //         const user = userId;
    //         console.log("====");
    //         console.log(user);
    //         console.log("====");
    //         socket.join(user);
    //     });
    // });

    // const db = mongoose.connection;
    // db.once("open", async () => {
    //     console.log("db connected");
    // });

    app.listen(port, () => {
        console.log(`listining to port ${port}`);

    })


}

module.exports = {
    startServer,
}