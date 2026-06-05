
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
            repositories: [],
            followedUser: [],
            starRepos: []
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
        res.status(500).send("Server Error !");
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
        res.status(500).send("Server Error !");
    }
}

async function getUserProfile(req, res) {
    const currId = req.params.id;

    try {
        const user = await User.findById(currId);

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
    const { email, password } = req.body;

    try {
        let updateField = {};

        if (email) {
            updateField.email = email;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateField.password = hashedPassword;
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

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};

