import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfileCard({ user }) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20">
                        <AvatarFallback>
                            U
                        </AvatarFallback>
                    </Avatar>

                    <h2 className="mt-4 text-xl font-bold">
                        {user?.userName}
                    </h2>

                    <div className="mt-6 w-full space-y-3">
                        <div className="flex justify-between">
                            <span>Repositories</span>

                            <span>
                                {user?.repository?.length || 0}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Following</span>

                            <span>
                                {user?.followedUser?.length || 0}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Starred</span>

                            <span>
                                {user?.starRepo?.length || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}