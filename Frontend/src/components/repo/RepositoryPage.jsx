import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../navbar/NavBar.jsx";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function RepositoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [repository, setRepository] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchRepository =
            async () => {

                try {

                    const response =
                        await axios.get(
                            `http://localhost:3000/repo/${id}`
                        );

                    setRepository(
                        response.data
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

                await axios.delete(
                    `http://localhost:3000/repo/delete/${id}`
                );

                navigate("/dashboard");

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
                `chronix clone ${repository._id}`
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
                                chronix clone{" "}
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
                            Repository Content
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        {repository.content
                            ?.length > 0 ? (

                            <ul
                                className="
                                    list-disc
                                    ml-5
                                "
                            >
                                {repository.content.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <li
                                            key={
                                                index
                                            }
                                        >
                                            {
                                                item
                                            }
                                        </li>
                                    )
                                )}
                            </ul>

                        ) : (

                            <p>
                                No content
                                available.
                            </p>

                        )}

                    </CardContent>
                </Card>

                {/* Issues */}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Issues
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        {repository.issues
                            ?.length > 0 ? (

                            repository.issues.map(
                                (
                                    issue
                                ) => (
                                    <div
                                        key={
                                            issue._id
                                        }
                                    >
                                        {
                                            issue.title
                                        }
                                    </div>
                                )
                            )

                        ) : (

                            <p>
                                No issues
                                created yet.
                            </p>

                        )}

                    </CardContent>
                </Card>

                {/* Danger Zone */}

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