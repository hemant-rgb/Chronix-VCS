const createIssue = (req,res)=>{
    res.send("issue created");
}

const updateIssueById = (req,res)=>{
    res.send("issue updated");

}
const deleteIssueById = (req,res)=>{
    res.send("issue deleted");
}

const getAllIssue = (req,res)=>{
    res.send("all issues list");
}

const getIssueById = (req,res)=>{
    res.send("issue got");
}

module.exports = {
    createIssue,
    getAllIssue,
    updateIssueById,
    deleteIssueById,
    getIssueById,
}