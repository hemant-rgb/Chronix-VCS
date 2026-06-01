const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName : {
        type:String,
        required: true,
        unique : true,
    },
    email : {
        type: String,
        required :true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    repository : [
        {
            default :[],
            type : Schema.Types.ObjectId,
            ref : "Repository",
        }
    ],
    followedUser : [
        {
            default : [],
            type : Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    starRepo : [
        {
            default :[],
            type : Schema.Types.ObjectId,
            ref : "Repository",
        }
    ],
});

const User = mongoose.model("User",UserSchema);

export default User;