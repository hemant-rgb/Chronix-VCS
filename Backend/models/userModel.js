const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require("validator");

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        match: [
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers and underscores"
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },
    bio: {
        type: String,
        default: "",
        maxlength: 500

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (password) {

                return (
                    /[A-Z]/.test(password) && // uppercase
                    /[a-z]/.test(password) && // lowercase
                    /[0-9]/.test(password)    // digit
                );

            },
            message:
                "Password must contain uppercase, lowercase and a number"
        }
    },
    repository: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        }
    ],
    following: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    followers: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    // starRepo: [
    //     {
    //         default: [],
    //         type: Schema.Types.ObjectId,
    //         ref: "Repository",
    //     }
    // ],

}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;