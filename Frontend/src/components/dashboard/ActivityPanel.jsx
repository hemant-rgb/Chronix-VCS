import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ActivityPanel({
    repositories,
}) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Repositories
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {repositories.length}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Commits
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            0
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Stars
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            0
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Activity Heatmap
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div
                        className="
                            h-87.5
                            rounded-lg
                            border
                            flex
                            items-center
                            justify-center
                            text-muted-foreground
                        "
                    >
                        Heatmap Coming Soon
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}