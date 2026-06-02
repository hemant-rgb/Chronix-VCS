const express = require("express");
const issueController = require("../controllers/issueController.js");

const issueRouter = express.Router();


issueRouter.post("/issue/create",issueController.createIssue);
issueRouter.get("/issue/all",issueController.getAllIssue);
issueRouter.get("/issue/:id",issueController.getIssueById);
issueRouter.put("/issue/update/:id",issueController.updateIssueById);
issueRouter.delete("/issue/delete/:id",issueController.deleteIssueById);

module.exports = issueRouter;