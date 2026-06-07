import { useEffect, useState } from "react";
import {
    useParams,
    useNavigate
} from "react-router-dom";



import { Button }
    from "@/components/ui/button";

import Navbar from "../navbar/NavBar";
import api from "@/lib/api";


export default function UserProfile() {

    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const currentUserId =
        localStorage.getItem(
            "userId"
        );

    const isOwnProfile =
        currentUserId === id;

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [showEdit, setShowEdit] =
        useState(false);

    const [bio, setBio] =
        useState("");

    const [userName,
        setUserName] =
        useState("");

    const [isFollowing,
        setIsFollowing] =
        useState(false);

    useEffect(() => {

        const fetchUser =
            async () => {

                try {

                    const response =
                        await api.get(
                            `/users/${id}`
                        );

                    setUser(
                        response.data
                    );

                    setUserName(
                        response.data.userName
                    );

                    setBio(
                        response.data.bio || ""
                    );

                    setIsFollowing(
                        response.data.followers?.some(
                            follower =>
                                follower._id ===
                                currentUserId
                        )
                    );

                } catch (err) {

                    console.error(err);

                } finally {

                    setLoading(false);

                }

            };

        fetchUser();

    }, [id, currentUserId]);

    const handleUpdateProfile =
        async () => {

            try {

                const response =
                    await api.put(
                        `/users/${id}`,
                        {
                            userName,
                            bio
                        }
                    );

                setUser(
                    response.data
                );

                setShowEdit(
                    false
                );

            } catch (err) {

                console.error(err);

            }

        };

    const handleFollow =
        async () => {

            try {

                await api.post(
                    `/users/${id}/follow`,
                    {
                        currentUserId
                    }
                );

                setIsFollowing(
                    true
                );

                setUser(
                    prev => ({
                        ...prev,
                        followers: [
                            ...(prev.followers || []),
                            {
                                _id:
                                    currentUserId
                            }
                        ]
                    })
                );

            } catch (err) {

                console.error(err);

            }

        };

    const handleUnfollow =
        async () => {

            try {

                await api.post(
                    `/users/${id}/unfollow`,
                    {
                        currentUserId
                    }
                );

                setIsFollowing(
                    false
                );

                setUser(
                    prev => ({
                        ...prev,
                        followers:
                            prev.followers.filter(
                                follower =>
                                    follower._id !==
                                    currentUserId
                            )
                    })
                );

            } catch (err) {

                console.error(err);

            }

        };

    if (loading) {

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

            <div
                className="
                    max-w-5xl
                    mx-auto
                    p-6
                "
            >

                <div
                    className="
                        border
                        rounded-lg
                        p-6
                        shadow-sm
                    "
                >

                    <h1
                        className="
                            text-3xl
                            font-bold
                        "
                    >
                        {user.userName}
                    </h1>

                    <p
                        className="
                            mt-2
                            text-gray-600
                        "
                    >
                        {
                            user.bio ||
                            "No bio yet"
                        }
                    </p>

                    <div
                        className="
                            flex
                            gap-8
                            mt-6
                            items-center
                        "
                    >

                        <div>
                            <strong>
                                Repositories
                            </strong>

                            <p>
                                {
                                    user.repository
                                        ?.length || 0
                                }
                            </p>
                        </div>

                        <div>
                            <strong>
                                Followers
                            </strong>

                            <p>
                                {
                                    user.followers
                                        ?.length || 0
                                }
                            </p>
                        </div>

                        <div>
                            <strong>
                                Following
                            </strong>

                            <p>
                                {
                                    user.following
                                        ?.length || 0
                                }
                            </p>
                        </div>

                        {
                            isOwnProfile && (

                                <Button
                                    onClick={() =>
                                        setShowEdit(
                                            true
                                        )
                                    }
                                >
                                    Edit Profile
                                </Button>

                            )
                        }

                        {
                            !isOwnProfile && (

                                isFollowing ? (

                                    <Button
                                        variant="outline"
                                        onClick={
                                            handleUnfollow
                                        }
                                    >
                                        Unfollow
                                    </Button>

                                ) : (

                                    <Button
                                        onClick={
                                            handleFollow
                                        }
                                    >
                                        Follow
                                    </Button>

                                )

                            )
                        }

                    </div>

                    {
                        showEdit && (

                            <div
                                className="
                                    border
                                    p-4
                                    rounded-lg
                                    mt-4
                                    space-y-3
                                "
                            >

                                <input
                                    className="
                                        w-full
                                        border
                                        rounded
                                        p-2
                                    "
                                    value={
                                        userName
                                    }
                                    onChange={(e) =>
                                        setUserName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Username"
                                />

                                <textarea
                                    className="
                                        w-full
                                        border
                                        rounded
                                        p-2
                                    "
                                    value={bio}
                                    onChange={(e) =>
                                        setBio(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Bio"
                                />

                                <Button
                                    onClick={
                                        handleUpdateProfile
                                    }
                                >
                                    Save
                                </Button>

                            </div>

                        )
                    }

                    <div
                        className="
                            mt-8
                        "
                    >

                        <h2
                            className="
                                text-xl
                                font-semibold
                                mb-4
                            "
                        >
                            Repositories
                        </h2>

                        <div
                            className="
                                space-y-3
                            "
                        >

                            {
                                user.repository?.map(
                                    repo => (
                                       

                                        <div
                                            key={repo._id}
                                            className="
                                                border
                                                rounded-lg
                                                p-4
                                                cursor-pointer
                                               
                                            "
                                            onClick={() =>
                                                navigate(
                                                    `/repo/${repo._id}`
                                                )
                                            }
                                        >

                                            <h3
                                                className="
                                                    font-semibold
                                                "
                                            >
                                                {
                                                    repo.name
                                                }
                                            </h3>

                                            <p
                                                className="
                                                    text-gray-600
                                                "
                                            >
                                                {
                                                    repo.description
                                                }
                                            </p>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}