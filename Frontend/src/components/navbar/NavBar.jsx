
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {

    return (
        <header
            className="
                sticky top-0 z-50
                border-b border-border/50
                bg-background/80
                backdrop-blur-xl
            "
        >
            <div
                className="
                    h-16
                    px-6
                    flex
                    items-center
                    justify-between
                    gap-6
                "
            >
               

                <Link
                    to="/"
                    className="
                        text-2xl
                        font-bold
                        tracking-tight
                        min-w-fit
                    "
                >
                    <b>Chronix</b>
                </Link>

              

                <div
                    className="
                        flex-1
                        max-w-2xl
                    "
                >
                    <SearchBar/>
                </div>

            

                <ProfileMenu />
            </div>
        </header>
    );
}

