
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/userModel.js");

dotenv.config();

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);

    } catch (err) {
        console.error("Error during fetching ALL : ", err.message);
        res.status(500).send("Server Error !");
    }
}

async function signup(req, res) {
    const { userName, password, email } = req.body;

    try {
        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            userId: newUser._id
        });

    } catch (err) {
        console.error("Error in SIGNUP : ", err.message);
        res.status(400).json({
            message: err.message
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.json({ token, userId: user._id });

    } catch (err) {
        console.error("Error during LOGIN : ", err.message);
        res.status(400).json({
            message: err.message
        });
    }
}

async function getUserProfile(req, res) {
    const currId = req.params.id;

    try {
        const user = await User.findById(currId).populate(
            "repository",
            "name description visibility"
        )
            .populate(
                "followers",
                "userName"
            )
            .populate(
                "following",
                "userName"
            );;

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.json(user);

    } catch (err) {
        console.error("Error during fetching : ", err.message);
        res.status(500).send("Server Error !");
    }
}

async function updateUserProfile(req, res) {
    const currId = req.params.id;
    if (
        req.user.id !== currId
    ) {

        return res
            .status(403)
            .json({
                message:
                    "Forbidden"
            });

    }
    const { email, password, bio } = req.body;

    try {
        let updateField = {};

        if (email) {
            updateField.email = email;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateField.password = hashedPassword;
        }
        if (bio !== undefined) {
            updateField.bio = bio;
        }

        const result = await User.findByIdAndUpdate(
            currId,
            updateField,
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.json(result);

    } catch (err) {
        console.error("Error during updating : ", err.message);
        res.status(500).send("Server Error !");
    }
}

async function deleteUserProfile(req, res) {
    const currId = req.params.id;
    if (
        req.user.id !== currId
    ) {

        return res
            .status(403)
            .json({
                message:
                    "Forbidden"
            });

    }

    try {
        const result = await User.findByIdAndDelete(currId);

        if (!result) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.json({ message: "User Profile Deleted" });

    } catch (err) {
        console.error("Error during deleting : ", err.message);
        res.status(500).send("Server Error !");
    }
}

async function followUser(
    req,
    res
) {
    const targetUserId =
        req.params.id;

    const {
        currentUserId
    } = req.body;

    try {

        const currentUser =
            await User.findById(
                currentUserId
            );

        const targetUser =
            await User.findById(
                targetUserId
            );

        if (
            !currentUser ||
            !targetUser
        ) {

            return res
                .status(404)
                .json({
                    message:
                        "User not found"
                });

        }

        if (
            !currentUser
                .following
                .includes(
                    targetUserId
                )
        ) {

            currentUser
                .following
                .push(
                    targetUserId
                );

            targetUser
                .followers
                .push(
                    currentUserId
                );

            await currentUser
                .save();

            await targetUser
                .save();
        }

        res.json({
            message:
                "Followed"
        });

    } catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }
}
async function unfollowUser(
    req,
    res
) {

    const targetUserId =
        req.params.id;

    const {
        currentUserId
    } = req.body;

    try {

        const currentUser =
            await User.findById(
                currentUserId
            );

        const targetUser =
            await User.findById(
                targetUserId
            );

        if (
            !currentUser ||
            !targetUser
        ) {

            return res
                .status(404)
                .json({
                    message:
                        "User not found"
                });

        }

        currentUser.following =
            currentUser.following.filter(
                userId =>
                    userId.toString()
                    !== targetUserId
            );

        targetUser.followers =
            targetUser.followers.filter(
                userId =>
                    userId.toString()
                    !== currentUserId
            );

        await currentUser.save();

        await targetUser.save();

        res.json({
            message:
                "Unfollowed successfully"
        });

    } catch (err) {

        console.error(
            err.message
        );

        res.status(500)
            .send(
                "Server Error!"
            );

    }

}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    followUser,
    unfollowUser
};

