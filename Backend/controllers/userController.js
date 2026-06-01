const getAllUsers = (req,res)=>{
    res.send("users fetched");
}

const signup = (req,res)=>{
    res.send("signup done");
}

const login = (req,res)=>{
    res.send("login done");
}

const getUserProfile = (req,res)=>{
    res.send("getuserProfile");
}
const updateUserProfile = (req,res)=>{
    res.send("updateuserProfile");
}
const deleteUserProfile = (req,res)=>{
    res.send("deleteuserProfile");
}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
}