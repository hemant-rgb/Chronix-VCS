import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        window.location.href = "/auth";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <Avatar className="cursor-pointer">
                        <AvatarFallback>
                            U
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() =>
                        navigate(`/profile/${userId}`)
                    }
                >
                    Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Dashboard
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="text-red-500"
                    onClick={handleLogout}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}