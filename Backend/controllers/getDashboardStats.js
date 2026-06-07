const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function getDashboardStats(req, res) {
    try {

        const repositories =
            await Repository.countDocuments();

        const users =
            await User.countDocuments();

        const issues =
            await Issue.countDocuments();

        

        res.json({
            repositories,
            users,
            issues,
            
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });

    }
}

module.exports = {
    getDashboardStats
};