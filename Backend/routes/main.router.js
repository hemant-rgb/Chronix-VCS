const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./user.router.js");
const repoRouter = require("./repo.router.js");
const issueRouter = require("./issue.router.js");
const dashboardRouter = require("./dashboard.router.js");




mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);
mainRouter.use(dashboardRouter);





mainRouter.get("/",(req,res)=>{
    res.send("!Welcome");
});

module.exports = mainRouter;