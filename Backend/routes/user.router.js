const express = require("express");
const userController = require("../controllers/userController.js");

const userRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

userRouter.get("/users", userController.getAllUsers);
userRouter.post("/signup",userController.signup);
userRouter.post("/login",userController.login);
userRouter.get("/users/:id",authMiddleware, userController.getUserProfile);
userRouter.put("/users/:id",authMiddleware,userController.updateUserProfile);
userRouter.delete("/users/:id",authMiddleware,userController.deleteUserProfile);


userRouter.post("/users/:id/follow",authMiddleware,userController.followUser);

userRouter.post("/users/:id/unfollow",authMiddleware,userController.unfollowUser);


module.exports = userRouter;