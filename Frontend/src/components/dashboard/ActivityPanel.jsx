import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    useEffect,
    useState,
} from "react";

import api from "@/lib/api";

export default function ActivityPanel() {

    const [stats, setStats] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function fetchStats() {

            try {

                const response =
                    await api.get(
                        "/dashboard/stats"
                    );

                setStats(
                    response.data
                );

            } catch (err) {

                console.error(
                    "Failed to fetch dashboard stats:",
                    err
                );

            } finally {

                setLoading(false);

            }
        }

        fetchStats();

    }, []);

    if (loading) {

        return (
            <Card>
                <CardContent className="pt-6">
                    Loading dashboard...
                </CardContent>
            </Card>
        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <Card>

                <CardHeader>

                    <CardTitle>
                        Chronix Platform Overview
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <p className="text-sm text-muted-foreground">
                        Distributed version control platform with
                        repository hosting, issue tracking,
                        developer collaboration and a custom CLI.
                    </p>

                </CardContent>

            </Card>

            {/* Statistics */}

            <div className="grid grid-cols-2 gap-4">

                <Card>

                    <CardContent className="p-5">

                        <p className="text-sm text-muted-foreground">
                            Repositories
                        </p>

                        <h2 className="text-3xl font-bold">
                            {stats?.repositories ?? 0}
                        </h2>

                    </CardContent>

                </Card>

                <Card>

                    <CardContent className="p-5">

                        <p className="text-sm text-muted-foreground">
                            Users
                        </p>

                        <h2 className="text-3xl font-bold">
                            {stats?.users ?? 0}
                        </h2>

                    </CardContent>

                </Card>

                <Card>

                    <CardContent className="p-5">

                        <p className="text-sm text-muted-foreground">
                            Issues
                        </p>

                        <h2 className="text-3xl font-bold">
                            {stats?.issues ?? 0}
                        </h2>

                    </CardContent>

                </Card>

              
            </div>


           
            {/* CLI Quick Start */}

            <Card>

                <CardHeader>

                    <CardTitle>
                        CLI Quick Start (Please refer github readme.md file for more)
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="space-y-2">

                        <code
                            className="
                                block
                                rounded
                                bg-muted
                                p-2
                                text-xs
                            "
                        >
                            chronix auth
                        </code>

                        <code
                            className="
                                block
                                rounded
                                bg-muted
                                p-2
                                text-xs
                            "
                        >
                            chronix init → add → commit → push
                        </code>

                        <code
                            className="
                                block
                                rounded
                                bg-muted
                                p-2
                                text-xs
                            "
                        >
                            chronix clone → pull → revert
                        </code>

                        <code
                            className="
                                block
                                rounded
                                bg-muted
                                p-2
                                text-xs
                            "
                        >
                            chronix status → log
                        </code>

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}