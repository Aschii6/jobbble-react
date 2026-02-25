import {Link} from "@tanstack/react-router";
import {useQuery} from "@tanstack/react-query";
import {fetchApplications} from "@/api/applications.ts";
import type {ApplicationStep} from "@/api/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";

function DashboardPage() {
    const {isPending, error, data: applications} = useQuery({
        queryKey: ["applications"],
        queryFn: fetchApplications,
    });

    const upcomingSteps: ApplicationStep[] = applications?.reduce((acc: ApplicationStep[], application) => {
        const steps = application.steps.filter(step => {
            if (!step.date) return false;
            const stepDate = new Date(step.date);
            const now = new Date();
            return stepDate >= now;
        });
        return [...acc, ...steps];
    }, []).sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }) ?? [];

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={"flex flex-col gap-4 p-4"}>
            <div className={"flex flex-row justify-between items-center"}>
                <h1 className={"text-primary-foreground font-bold text-xl"}>Dashboard</h1>
                <Link to={"/companies"}>
                    <Button variant={"outline"}>
                        View Companies
                    </Button>
                </Link>
                <Link to={"/applications"}>
                    <Button variant={"outline"}>
                        View Applications
                    </Button>
                </Link>
            </div>
            <div className={"flex flex-col gap-4"}>
                <h2 className={"text-lg font-semibold text-primary-foreground"}>Upcoming steps</h2>
                {upcomingSteps && upcomingSteps.length > 0 ? (
                    <ScrollArea>
                        <div className={"flex flew-row gap-8"}>
                            {upcomingSteps.map((step) => (
                                <div key={step.id} className={"border rounded-lg mb-3 p-3 w-1/3 shrink-0"}>
                                    <h3 className={"font-semibold text-primary-foreground"}>{step.title}</h3>
                                    <p>{step.description}</p>
                                    {step.date &&
                                        <p className={"text-sm text-muted-foreground"}>Date: {new Date(step.date).toLocaleDateString()}</p>}
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation={"horizontal"}/>
                    </ScrollArea>
                ) : (
                    <p className={"text-muted-foreground"}>No upcoming steps</p>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;

