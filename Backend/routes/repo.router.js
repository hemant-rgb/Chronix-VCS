const express = require("express");
const repoController = require("../controllers/repoController.js");

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all",repoController.getAllRepository);
repoRouter.get("/repo/:id",repoController.fetchRepoById);
repoRouter.get("/repo/name/:name",repoController.fetchRepoByName);
repoRouter.get("/repo/user/:userId",repoController.fetchRepoForCurrentUser);
repoRouter.put("/repo/update/:id",repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id",repoController.deleteRepositoryById);
repoRouter.patch("/repo/delete/:id",repoController.deleteRepositoryById);


module.exports = repoRouter;
