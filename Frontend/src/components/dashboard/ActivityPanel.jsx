import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ActivityPanel() {


    return (
        <div className="space-y-6">
            <Card>

                <CardContent className="pt-6">

                    <div className="space-y-4">

                        <div>
                            <h3 className="font-semibold text-lg">
                                Chronix VCS
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Custom distributed version control system
                                with cloud-backed repository hosting and
                                issue tracking.
                            </p>
                        </div>

                        <div className="text-sm">
                            <p className="font-medium mb-2">
                                Core Features
                            </p>

                            <div className="grid grid-cols-2 gap-y-1">
                                <span>✓ Repository Hosting</span>
                                <span>✓ Commit Tracking</span>
                                <span>✓ Push & Pull</span>
                                <span>✓ Clone Support</span>
                                <span>✓ Issue Tracking</span>
                                <span>✓ User Profiles</span>
                            </div>
                        </div>

                        <div className="text-sm">
                            <p className="font-medium mb-1">
                                Workflow
                            </p>

                            <code className="text-xs">
                                init → add → commit → push
                            </code>

                            <br />

                            <code className="text-xs">
                                clone → pull → revert
                            </code>
                        </div>

                    </div>

                </CardContent>

            </Card>

        </div>
    );


}
