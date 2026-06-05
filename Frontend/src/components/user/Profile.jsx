import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../navbar/Navbar";

export default function Profile() {
    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/getUserProfile/${id}`
                );

                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="p-6">
                    Loading...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="p-6">
                <h1 className="text-3xl font-bold">
                    {user.userName}
                </h1>

                <p className="text-muted-foreground">
                    {user.email}
                </p>
            </div>
        </>
    );
}

