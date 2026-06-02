const createRepository = (req,res)=>{
    res.send("repo created");
}
const getAllRepository = (req,res)=>{
    res.send("all repo");
}
const fetchRepoById = (req,res)=>{
    res.send("repo fetched by id");
}
const fetchRepoByName = (req,res)=>{
    res.send("repo fetched by name");
}
const fetchRepoForCurrentUser=(req,res)=>{
    res.send("all user repo");
}
const updateRepositoryById = (req,res)=>{
    res.send("repo updated");
}
const deleteRepositoryById = (req,res)=>{
    res.send("repo deleted");
}
const toggleVisibilityRepoById = (req,res)=>{
    res.send("repo visibility");
}

module.exports = {
    createRepository,
    getAllRepository,
    fetchRepoById,
    fetchRepoByName,
    fetchRepoForCurrentUser,
    updateRepositoryById,
    deleteRepositoryById,
    toggleVisibilityRepoById,
    

}