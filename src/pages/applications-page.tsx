import {useQuery} from "@tanstack/react-query";
import {fetchApplications} from "@/api/applications.ts";
import ApplicationCard from "@/components/application-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "@tanstack/react-router";

function ApplicationsPage() {
    const {isPending, error, data: applications} = useQuery({
        queryKey: ["applications"],
        queryFn: fetchApplications,
    });

    const navigate = useNavigate();

    const handleClickAdd = () => {
        navigate({
            to: "/applications/new",
        }).then();
    }

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={"p-4 w-full max-w-3xl mx-auto flex flex-col items-center gap-4"}>
            <h1 className={"text-2xl text-primary-foreground"}>Applications</h1>
            <div className={"flex flex-col gap-4"}>
                {applications.map(application => (
                    <ApplicationCard key={application.id} application={application}/>
                ))}
            </div>
            <Button
                type="button"
                onClick={handleClickAdd}
                className="fixed bottom-6 right-6 rounded-full h-16 w-16 hover:w-20 hover:h-20 text-lg shadow-[7px_7px_2px_rgba(0,0,0,0.2)]"
                aria-label="Add application"
            >
                +
            </Button>
        </div>
    );
}

export default ApplicationsPage;