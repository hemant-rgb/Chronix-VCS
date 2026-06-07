const express = require("express");
const repoController = require("../controllers/repoController.js");
const { getRepositoryTree } = require("../controllers/getRepositoryTree.js");
const { getRepositoryFile } = require("../controllers/getRepositoryFile.js");
const { getRepositoryCommits } = require("../controllers/getRepositoryCommits.js");
const authMiddleware = require("../middleware/authMiddleware.js");


const repoRouter = express.Router();

repoRouter.post("/repo/create",authMiddleware, repoController.createRepository);
repoRouter.get("/repo/all",repoController.getAllRepository);
repoRouter.get("/repo/:id",repoController.fetchRepoById);
repoRouter.get("/repo/name/:name",repoController.fetchRepoByName);
repoRouter.get("/repo/user/:userId",authMiddleware,repoController.fetchRepoForCurrentUser);
repoRouter.put("/repo/update/:id",authMiddleware,repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id",authMiddleware,repoController.deleteRepositoryById);
repoRouter.get("/repo/user/:id/tree",authMiddleware,getRepositoryTree);
repoRouter.get("/repo/user/:id/file",authMiddleware,getRepositoryFile);
repoRouter.get("/repo/user/:id/commits",authMiddleware,getRepositoryCommits);
// repoRouter.patch("/repo/delete/:id",repoController.deleteRepositoryById);


module.exports = repoRouter;
