
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";

import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!userName || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:3000/signup",
                {
                    email,
                    password,
                    userName,
                }
            );

            localStorage.setItem("token", res.data.token);      // providing browser's local storage token and userId
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);

            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Signup Failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Card
                className="
                    w-full
                    max-w-lg
                    border-border/50
                    bg-card/90
                    backdrop-blur-xl
                    shadow-2xl
                "
            >
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-semibold">
                        Create your account
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                        Start building and managing repositories with Chronix.
                    </p>
                </CardHeader>

                <CardContent className="space-y-5">
                    <Button
                        variant="outline"
                        className="w-full h-11"
                    >
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>

                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username">
                            Username
                        </Label>

                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            autoComplete="off"
                            value={userName}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <Button
                        className="w-full h-11"
                        disabled={loading}
                        onClick={handleSignup}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?
                        <Link
                            to="/auth"
                            className="
                                ml-1
                                text-primary
                                hover:underline
                            "
                        >
                            Sign In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}

