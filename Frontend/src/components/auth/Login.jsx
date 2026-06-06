
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import api from "@/lib/api";

import React, { useState } from "react";


import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post(
                `/login`,
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);

            navigate("/");
        } catch (err) {
            console.error(err);

            if (err.response?.status === 401) {
                alert("Invalid email or password");
            } else {
                alert("Login Failed!");
            }
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
                        Welcome back !
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                        Sign in to continue using Chronix.
                    </p>
                </CardHeader>

                <CardContent className="space-y-5">
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
                        onClick={handleLogin}
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className="
                                ml-1
                                text-primary
                                hover:underline
                            "
                        >
                            Create one
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}

