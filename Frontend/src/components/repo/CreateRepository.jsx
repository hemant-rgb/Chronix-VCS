import { useState } from "react";
import { useNavigate } from "react-router-dom";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";


export default function CreateRepository() {
    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [visibility,
        setVisibility] =
        useState(false);

    const handleCreate =
        async () => {

            try {

                const owner =
                    localStorage.getItem(
                        "userId"
                    );

                await api.post(
                    `/repo/create`,
                    {
                        owner,
                        name,
                        description,
                        visibility,
                    }
                );

                alert(
                    "Repository Created!"
                );
                navigate("/");

            } catch (err) {

                console.error(err);

            }
        };

    return (
        <div className="p-6">
            <Card
                className="
                    mx-auto
                    max-w-xl
                "
            >
                <CardHeader>
                    <CardTitle>
                        Create Repository
                    </CardTitle>
                </CardHeader>

                <CardContent
                    className="
                        space-y-4
                    "
                >
                    <Input
                        placeholder="Repository Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <Textarea
                        placeholder="Description"
                        value={
                            description
                        }
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <div
                        className="
                            flex
                            gap-2
                        "
                    >
                        <Button
                            variant={
                                !visibility
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                setVisibility(
                                    false
                                )
                            }
                        >
                            Private
                        </Button>

                        <Button
                            variant={
                                visibility
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                setVisibility(
                                    true
                                )
                            }
                        >
                            Public
                        </Button>
                    </div>

                    <Button
                        onClick={
                            handleCreate
                        }
                        className="w-full"
                    >
                        Create Repository
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}