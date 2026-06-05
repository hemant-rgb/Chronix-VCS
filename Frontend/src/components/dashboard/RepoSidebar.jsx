import { Link, useNavigate } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// const supabase =
//     require("../config/supabase-config");

export default function RepoSidebar({
    repositories,
}) {

    const navigate = useNavigate();

    return (
        <div
            className="
                h-[calc(100vh-6rem)]
                rounded-xl
                border
                bg-card
                p-4
            "
        >
            <div
                className="
                    mb-4
                    flex
                    items-center
                    justify-between
                "
            >
                <h2
                    className="
                        text-lg
                        font-semibold
                    "
                >
                    Repositories
                </h2>

                <Button
                    size="sm"
                    onClick={() =>
                        navigate(
                            "/repo/create"
                        )
                    }
                >
                    + New
                </Button>
            </div>

            <ScrollArea className="h-full">
                <div className="space-y-2">
                    {repositories?.map(
                        (repo) => (
                            <Link
                                key={repo._id}
                                to={`/repo/${repo._id}`}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-lg
                                    border
                                    p-3
                                    transition
                                    hover:bg-muted
                                "
                            >
                                <span
                                    className="
                                        truncate
                                        font-medium
                                    "
                                >
                                    {repo.name}
                                </span>

                                <Badge
                                    variant={
                                        repo.visibility
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {repo.visibility
                                        ? "Public"
                                        : "Private"}
                                </Badge>
                            </Link>
                        )
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}