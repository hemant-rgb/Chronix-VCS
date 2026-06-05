import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function LogoutButton() {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        setCurrentUser(null);

        navigate("/auth");
    };

    return (
        <Button
            variant="outline"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
}