
import CommitGraph from "./CommitGraph";


export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-background bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_35%)]">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden lg:flex flex-col px-16 pt-24">
                    <div className="max-w-md">
                        <h1 className="text-8xl font-bold tracking-tight">
                            Chronix
                        </h1>

                        <p className="mt-4 text-muted-foreground text-lg">
                            The Smarter Way to Manage Code.
                        </p>

                        <p className="mt-2 text-muted-foreground">
                            Track, collaborate, and build software with a modern version control experience.
                        </p>

                        <div className="mt-12">
                            <CommitGraph />
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-6">
                    {children}
                </div>

            </div>
        </div>
    );
}