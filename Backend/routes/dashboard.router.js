const express = require("express");

const {
    getDashboardStats
} = require(
    "../controllers/getDashboardStats.js"
);

const dashboardRouter =
    express.Router();

dashboardRouter.get(
    "/dashboard/stats",
    getDashboardStats
);

module.exports =
    dashboardRouter;