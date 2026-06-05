const mongoose = require("mongoose");
const Repository = require("../models/repoModel.js");
const User = require("../models/userModel.js");
const Issue = require("../models/issueModel.js");
const supabase =
    require("../config/supabase-config");






async function createRepository(req, res) {
    const { owner, name, issues, content, description, visibility } = req.body;

    try {
        if (!name) {
            return res.status(400).send("Repository's user name is required !");
        }
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).send("User Id is required!");
        }
        const newRepo = new Repository({
            name,
            description,
            owner,
            content,
            visibility,
            issues,
        });

        const result = await newRepo.save();
        await User.findByIdAndUpdate(owner, { $push: { repository: result._id } });
        const repoId = result._id.toString();

        await supabase.storage
            .from("chronixBucket")
            .upload(
                `${repoId}/HEAD`,
                Buffer.from(""),
                {
                    upsert: true
                }
            );
        res.status(201).json({
            message: "Repository Created !",
            repoId: result._id
        })

    } catch (err) {
        console.error("Error during creation of Repository : ", err.message);
        res.status(500).send("Server Error !");
    }
}




async function getAllRepository(req, res) {
    try {
        const repositories = await Repository.find({}).populate("owner").populate("issues");
        // populate -> since mongoDB stores only references to User and Issue model , populate tells it to fetch the actual data from these refernces 
        // owner -> User model
        // issues -> Issue model

        res.json({ message: "repositories found !", repositories });

    } catch (err) {
        console.error("Error during fetching of Repositories : ", err.message);
        res.status(500).send("Server Error !");
    }
}




async function fetchRepoById(req, res) {
    const repoId = req.params.id;
    try {
        if (!repoId) {
            return res.status(400).send("Invalid RepoId");
        }
        const repo = await Repository.findById(repoId).populate("owner").populate("issues");
        if (!repo) {
            return res.status(404)
                .send("Repository Not Found");
        }
        res.json(repo);
    } catch (err) {
        console.error("Error during fetching of Repository by Id : ", err.message);
        res.status(500).send("Server Error !");
    }
}




async function fetchRepoByName(req, res) {
    const repoName = req.params.name;
    try {
        if (!repoName) {
            return res.status(400).send("Invalid RepoName");
        }
        const repo = await Repository.findOne({ name: repoName }).populate("owner").populate("issues");
        if (!repo) {
            return res.status(404)
                .send("Repository Not Found");
        }
        res.json(repo);
    } catch (err) {
        console.error("Error during fetching of Repository by Name : ", err.message);
        res.status(500).send("Server Error !");
    }
}





async function fetchRepoForCurrentUser(req, res) {
    const userId = req.params.userId;
    try {
        if (!userId) {
            return res.status(400).send("userId not found");
        }
        const repositories = await Repository.find({ owner: userId }).populate("owner").populate("issues");


        res.json(repositories);
    } catch (err) {
        console.error("Error during fetching of Repository by Name : ", err.message);
        res.status(500).send("Server Error !");
    }
}





async function updateRepositoryById(req, res) {
    const repoId = req.params.id;
    const { content, description } = req.body;
    try {
        if (!repoId) {
            return res.status(400).send("Invalid RepoId");
        }

        const repository = await Repository.findById(repoId);
        if (!repository) {
            return res.status(404)
                .send("Repository Not Found");
        }
        // adding new content
        if (content) {
            repository.content.push(content);
        }

        //over write the old description
        if (description) {
            repository.description =
                description;
        }
        const updatedRepo = await repository.save();
        res.json({
            message: "repository updated",
            repository: updatedRepo,
        });
    } catch (err) {
        console.error("Error during updating repository : ", err.message);
        res.status(500).send("Server Error !");
    }

}





async function deleteRepositoryById(req, res) {
    const repoId = req.params.id;

    try {
        if (!repoId) {
            return res.status(400).send("Invalid RepoId");
        }

        const repository = await Repository.findByIdAndDelete(repoId);
        // deleting the repo ref from user also 
        await User.findByIdAndUpdate(
            repository.owner,
            {
                $pull: {
                    repository: repoId
                }
            }
        );
        if (!repository) {
            return res.status(404)
                .send("Repository Not Found");
        }


        res.json({
            message: "repository deleted successfully"
        });
    } catch (err) {
        console.error("Error during deleting repository : ", err.message);
        res.status(500).send("Server Error !");
    }
}





async function toggleVisibilityRepoById(req, res) {
    const repoId = req.params.id;

    try {
        if (!repoId) {
            return res.status(400).send("Invalid RepoId");
        }

        const repository = await Repository.findById(repoId);
        if (!repository) {
            return res.status(404)
                .send("Repository Not Found");
        }
        repository.visibility = !repository.visibility;
        const updatedRepo = await repository.save();
        res.json({
            message: "visibility changed",
            repository: updatedRepo,
        });
    } catch (err) {
        console.error("Error during changing visibility of  repository : ", err.message);
        res.status(500).send("Server Error !");
    }
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