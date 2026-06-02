
const mongoose = require("mongoose");
const Repository = require("../models/repoModel.js");
const Issue = require("../models/issueModel.js");

async function createIssue(req, res) {
    const { title, description, repository } = req.body;

    try {
        if (!title || !description) {
            return res.status(400)
                .send("Title and Description are required !");
        }

        if (!mongoose.Types.ObjectId.isValid(repository)) {
            return res.status(400)
                .send("Invalid Repository Id !");
        }

        const repo = await Repository.find(repository);

        if (!repo) {
            return res.status(404)
                .send("Repository Not Found");
        }

        const newIssue = new Issue({
            title,
            description,
            repository
        });

        const savedIssue = await newIssue.save();

        repo.issues.push(savedIssue._id);
        await repo.save();

        res.json({
            message: "Issue created",
            issue: savedIssue
        });

    } catch (err) {
        console.error(
            "Error during creation of Issue : ",
            err.message
        );

        res.status(500)
            .send("Server Error !");
    }
}

async function getAllIssue(req, res) {
    try {
        const issues = await Issue.find({})
            .populate("repository");

        res.json(issues);

    } catch (err) {
        console.error(
            "Error during fetching all issues : ",
            err.message
        );

        res.status(500)
            .send("Server Error !");
    }
}

async function getIssueById(req, res) {
    const issueId = req.params.id;

    try {
        if (!issueId) {
            return res.status(400)
                .send("Invalid Issue Id !");
        }

        const issue = await Issue.findById(issueId)
            .populate("repository");

        if (!issue) {
            return res.status(404)
                .send("Issue Not Found");
        }

        res.json(issue);

    } catch (err) {
        console.error(
            "Error during fetching issue : ",
            err.message
        );

        res.status(500)
            .send("Server Error !");
    }
}

async function updateIssueById(req, res) {
    const issueId = req.params.id;
    const { title, description, status } = req.body;

    try {
        if (!issueId) {
            return res.status(400)
                .send("Invalid Issue Id !");
        }

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404)
                .send("Issue Not Found");
        }

        if (title) {
            issue.title = title;
        }

        if (description) {
            issue.description = description;
        }

        if (status) {
            issue.status = status;
        }

        const updatedIssue = await issue.save();

        res.json({
            message: "Issue updated",
            issue: updatedIssue
        });

    } catch (err) {
        console.error(
            "Error during updating issue : ",
            err.message
        );

        res.status(500)
            .send("Server Error !");
    }
}

async function deleteIssueById(req, res) {
    const issueId = req.params.id;

    try {
        if (!issueId) {
            return res.status(400)
                .send("Invalid Issue Id !");
        }

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404)
                .send("Issue Not Found");
        }

        const repo = await Repository.findById(
            issue.repository
        );

        if (repo) {
            repo.issues =
                repo.issues.filter(
                    (id) =>
                        id.toString() !== issueId
                );

            await repo.save();
        }

        await Issue.findByIdAndDelete(issueId);

        res.json({
            message: "Issue deleted"
        });

    } catch (err) {
        console.error(
            "Error during deleting issue : ",
            err.message
        );

        res.status(500)
            .send("Server Error !");
    }
}

module.exports = {
    createIssue,
    getAllIssue,
    updateIssueById,
    deleteIssueById,
    getIssueById,
};

