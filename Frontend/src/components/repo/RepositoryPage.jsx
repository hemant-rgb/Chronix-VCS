import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


import Navbar from "../navbar/NavBar.jsx";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import FileTree from "./FileTree.jsx";

import { Button } from "@/components/ui/button";
import api from "@/lib/api.js";

export default function RepositoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tree, setTree] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const [click, setClick] = useState(false);

    const [fileContent, setFileContent] = useState("");
    const [repository, setRepository] = useState(null);
    const [commits, setCommits] = useState([]);
    const [issues, setIssues] = useState([]);

    const [showIssueForm, setShowIssueForm] = useState(false);

    const [issueTitle, setIssueTitle] = useState("");

    const [issueDescription, setIssueDescription] = useState("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchRepository =
            async () => {

                try {

                    const response =
                        await api.get(
                            `/repo/user/${id}`
                        );

                    setRepository(
                        response.data
                    );



                    const treeResponse =
                        await api.get(
                            `/repo/${id}/tree`
                        );
                    setTree(
                        treeResponse.data.tree
                    );


                    const commitResponse =
                        await api.get(
                            `/repo/${id}/commits`
                        );

                    setCommits(
                        commitResponse.data
                    );

                    const issueResponse =
                        await api.get(
                            `/repo/${id}/issues`
                        );

                    setIssues(
                        issueResponse.data
                    );

                } catch (err) {

                    console.error(
                        "Error fetching repository:",
                        err
                    );

                } finally {

                    setLoading(false);

                }
            };

        fetchRepository();

    }, [id]);

    const handleDelete =
        async () => {

            const confirmDelete =
                window.confirm(
                    "Delete this repository?"
                );

            if (!confirmDelete) return;

            try {

                await api.delete(
                    `/repo/delete/${id}`
                );

                navigate("/");

            } catch (err) {

                console.error(
                    "Error deleting repository:",
                    err
                );

            }
        };

    const handleCopy =
        () => {

            navigator.clipboard.writeText(
                `${repository._id}`
            );

            alert(
                "Clone command copied!"
            );
        };

    if (loading) {

        return (
            <>
                <Navbar />
                <div className="p-6">
                    Loading Repository...
                </div>
            </>
        );
    }

    if (!repository) {

        return (
            <>
                <Navbar />
                <div className="p-6">
                    Repository Not Found
                </div>
            </>
        );
    }
    const handleFileClick =
        async (path) => {

            try {

                console.log(
                    "Clicked:",
                    path
                );

                const response =
                    await api.get(
                        `/repo/${id}/file`,
                        {
                            params: {
                                path
                            }
                        }
                    );

                setSelectedFile(
                    path
                );

                setFileContent(
                    response.data.content
                );
                setClick(!click);

            } catch (err) {

                console.error(
                    "Error loading file:",
                    err
                );

            }
        };
    const handleCreateIssue =
        async () => {

            try {

                const userId =
                    localStorage.getItem(
                        "userId"
                    );

                const response =
                    await api.post(
                        `/repo/${id}/issues`,
                        {
                            title:
                                issueTitle,

                            description:
                                issueDescription,

                            repository:
                                id,

                            createdBy:
                                userId
                        }
                    );

                setIssues([
                    response.data.issue,
                    ...issues
                ]);

                setIssueTitle("");
                setIssueDescription("");

                setShowIssueForm(
                    false
                );

            } catch (err) {

                console.error(
                    err
                );

            }
        };
    const handleCloseIssue =
        async (issueId) => {

            try {

                await api.put(
                    `/issues/${issueId}`,
                    {
                        status: "closed"
                    }
                );

                setIssues(
                    prev =>
                        prev.map(
                            issue =>
                                issue._id === issueId
                                    ? {
                                        ...issue,
                                        status:
                                            "closed"
                                    }
                                    : issue
                        )
                );

            } catch (err) {

                console.error(
                    "Error closing issue:",
                    err
                );

            }
        };

    return (
        <>
            <Navbar />

            <div
                className="
                    max-w-6xl
                    mx-auto
                    p-6
                    space-y-6
                "
            >
                {/* Header */}

                <Card>
                    <CardHeader>

                        <CardTitle>
                            {repository.name}
                        </CardTitle>

                        <CardDescription>
                            {
                                repository.description ||
                                "No description provided."
                            }
                        </CardDescription>

                    </CardHeader>

                    <CardContent
                        className="
                            space-y-2
                        "
                    >
                        <p>
                            <strong>
                                Owner:
                            </strong>{" "}
                            {
                                repository.owner
                                    ?.userName
                            }
                        </p>

                        <p>
                            <strong>
                                Repository Id:
                            </strong>{" "}
                            {
                                repository._id
                            }
                        </p>

                        <p>
                            <strong>
                                Visibility:
                            </strong>{" "}
                            {
                                repository.visibility
                                    ? "Public"
                                    : "Private"
                            }
                        </p>

                        <p>
                            <strong>
                                Issues:
                            </strong>{" "}
                            {
                                repository.issues
                                    ?.length || 0
                            }
                        </p>
                    </CardContent>
                </Card>

                {/* Clone */}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Clone Repository
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                                rounded-lg
                                border
                                p-4
                            "
                        >
                            <code>
                                {" "}
                                {
                                    repository._id
                                }
                            </code>

                            <Button
                                onClick={
                                    handleCopy
                                }
                            >
                                Copy
                            </Button>
                        </div>

                    </CardContent>
                </Card>

                {/* Content */}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Repository Files
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <FileTree
                            nodes={tree}
                            onFileClick={
                                handleFileClick
                            }
                        />

                    </CardContent>
                </Card>
                <Card>

                    <CardHeader>

                        <CardTitle>
                            File Viewer
                        </CardTitle>

                        <CardDescription>
                            {
                                selectedFile ||
                                "Select a file"
                            }
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        <pre
                            className="
                overflow-auto
                bg-slate-900
                text-white
                p-4
                rounded-lg
                min-h-75
            "
                        >
                            {
                                fileContent ||
                                (click == true ? "no content" : "Click a file to view its contents.")
                            }
                        </pre>

                    </CardContent>

                </Card>
                {/* commit History */}
                <Card>

                    <CardHeader>

                        <CardTitle>
                            Commit History
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {commits.length === 0 ? (

                            <p>
                                No commits found.
                            </p>

                        ) : (

                            commits.map(
                                (commit) => (

                                    <div
                                        key={
                                            commit.commitId
                                        }
                                        className="
                            border-b
                            py-3
                        "
                                    >

                                        <h4
                                            className="
                                font-semibold
                            "
                                        >
                                            {
                                                commit.message
                                            }
                                        </h4>

                                        <p
                                            className="
                                text-sm
                                text-gray-500
                            "
                                        >
                                            {
                                                new Date(
                                                    commit.date
                                                ).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )
                                            }
                                        </p>

                                        <code
                                            className="
                                text-xs
                            "
                                        >
                                            {
                                                commit.commitId.slice(
                                                    0,
                                                    8
                                                )
                                            }
                                        </code>

                                    </div>

                                )
                            )

                        )}

                    </CardContent>

                </Card>

                {/* Issues */}




                <Card>
                    <CardHeader>
                        <div
                            className="flex justify-between items-center">

                            <CardTitle>
                                Issues
                            </CardTitle>

                            <Button
                                onClick={() =>
                                    setShowIssueForm(
                                        !showIssueForm
                                    )
                                }
                            >
                                + New Issue
                            </Button>

                        </div>

                    </CardHeader>
                    {
                        showIssueForm && (

                            <div
                                className=" mb-6 space-y-3 ">

                                <input
                                    type="text"
                                    placeholder="Issue Title"
                                    value={issueTitle}
                                    onChange={(e) =>
                                        setIssueTitle(
                                            e.target.value
                                        )
                                    }
                                    className=" w-full border p-2 rounded" />

                                <textarea
                                    placeholder="Issue Description"
                                    value={
                                        issueDescription
                                    }
                                    onChange={(e) =>
                                        setIssueDescription(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border p-2 rounded" />

                                <Button
                                    onClick={
                                        handleCreateIssue
                                    }
                                >
                                    Create Issue
                                </Button>

                            </div>

                        )}

                    <CardContent>

                        {
                            issues.length > 0 ? (

                                issues.map(
                                    (issue) => (

                                        <div
                                            key={issue._id}
                                            className="border-b py-4 ">

                                            <h4
                                                className=" font-semibold ">
                                                {issue.title}
                                            </h4>

                                            <p>
                                                {
                                                    issue.description
                                                }
                                            </p>

                                            <p
                                                className=" text-sm text-gray-500 ">
                                                Opened by{" "}
                                                {
                                                    issue.createdBy
                                                        ?.userName
                                                }
                                            </p>

                                            <p
                                                className=" text-sm ">
                                                Status:
                                                {" "}
                                                {issue.status}
                                            </p>
                                            
                                            {  
                                                issue.status === "open" && (
                                                    <Button
                                                        
                                                        onClick={() =>
                                                            handleCloseIssue(
                                                                issue._id
                                                            )
                                                        }
                                                    >
                                                        Close Issue
                                                    </Button>
                                                )
                                            }

                                        </div>

                                    )
                                )

                            ) : (

                                <p>
                                    No issues yet.
                                </p>

                            )
                        }

                    </CardContent>
                </Card>






                {/* Delete Button */}

                <Card
                    className="
                        border-red-500
                    "
                >
                    <CardHeader>

                        <CardTitle>
                            Danger Zone
                        </CardTitle>

                        <CardDescription>
                            This action
                            cannot be
                            undone.
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        <Button
                            variant="destructive"
                            onClick={
                                handleDelete
                            }
                        >
                            Delete Repository
                        </Button>

                    </CardContent>
                </Card>

            </div>
        </>
    );
}