import React, { useState, useEffect } from "react";


import Navbar from "../navbar/NavBar.jsx";

import RepoSidebar from "./RepoSidebar.jsx";
import ActivityPanel from "./ActivityPanel.jsx";
import UserProfileCard from "./UserProfileCard.jsx";
import api from "@/lib/api";


const Dashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId =
            localStorage.getItem("userId");

        const fetchRepositories =
            async () => {
                try {
                    const response =
                        await api.get(
                            `/repo/user/${userId}`
                        );

                    setRepositories(
                        response.data
                    );
                } catch (err) {
                    console.error(
                        "Error fetching repositories:",
                        err
                    );
                }
            };

        const fetchUser =
            async () => {
                try {
                    const response =
                        await api.get(
                            `/users/${userId}`
                        );

                    setUser(
                        response.data
                    );
                } catch (err) {
                    console.error(
                        "Error fetching user:",
                        err
                    );
                }
            };

        fetchRepositories();
        fetchUser();
    }, []);

    return (
        <>
            <Navbar />

            <div
                className="
                    grid
                    grid-cols-12
                    gap-6
                    p-6
                    min-h-[calc(100vh-4rem)]
                "
            >
                {/* Left Sidebar */}

                <div className="col-span-3">
                    <RepoSidebar
                        repositories={
                            repositories
                        }
                    />
                </div>

                {/* Center */}

                <div className="col-span-6">
                    <ActivityPanel/>
                   
                </div>

                {/* Right Sidebar */}

                <div className="col-span-3">
                    <UserProfileCard
                        user={user}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;