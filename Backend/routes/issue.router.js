const express = require("express");
const issueController = require("../controllers/issueController.js");

const issueRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");


issueRouter.post("/repo/:repoId/issues",authMiddleware,issueController.createIssue);
issueRouter.get("/repo/:repoId/issues",issueController.getRepositoryIssues);
issueRouter.get("/issues/:id",issueController.getIssueById);
issueRouter.put("/issues/:id",authMiddleware,issueController.updateIssueById);
issueRouter.delete("/issues/:id",authMiddleware,issueController.deleteIssueById);

module.exports = issueRouter;