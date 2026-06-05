
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SearchBar() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/allUsers"
                );

                setUsers(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(
                    "Error fetching users:",
                    err
                );
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const filteredUsers = users.filter(
            (user) =>
                user?.userName &&
                user.userName
                    .toLowerCase()
                    .includes(
                        searchQuery.toLowerCase()
                    )
        );

        setSearchResults(filteredUsers);
    }, [searchQuery, users]);

    const handleUserClick = (userId) => {
        setSearchQuery("");
        setSearchResults([]);

        navigate(`/profile/${userId}`);
    };

    return (
        <div className="relative w-full">
            <Input
                value={searchQuery}
                onChange={(e) =>
                    setSearchQuery(e.target.value)
                }
                placeholder="Search users..."
                className="
                    h-10
                    bg-muted/30
                "
            />

            {searchResults.length > 0 && (
                <Card
                    className="
                        absolute
                        top-12
                        left-0
                        w-full
                        p-2
                        z-50
                        shadow-xl
                    "
                >
                    {searchResults.map((user) => (
                        <div
                            key={user._id}
                            onClick={() =>
                                handleUserClick(
                                    user._id
                                )
                            }
                            className="
                                px-3
                                py-2
                                rounded-md
                                cursor-pointer
                                hover:bg-muted
                                transition
                            "
                        >
                            {user.userName}
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
}

