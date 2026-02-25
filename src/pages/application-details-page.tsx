import {useParams} from "@tanstack/react-router";
import {useQuery} from "@tanstack/react-query";
import {fetchApplicationById, updateApplication} from "@/api/applications.ts";
import {
    Combobox,
    ComboboxContent, ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox.tsx";
import {APPLICATION_STATUSES, type ApplicationStatus} from "@/api/types.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import AddStepDialog from "@/components/add-step-dialog.tsx";

function ApplicationDetailsPage() {
    const {applicationId} = useParams({from: "/applications/$applicationId"});
    const parsedApplicationId = Number(applicationId);
    const hasValidId = Number.isFinite(parsedApplicationId);

    const {isPending, error, data: application, refetch} = useQuery({
        queryKey: ["application", parsedApplicationId],
        queryFn: () => fetchApplicationById(parsedApplicationId),
        refetchOnWindowFocus: false,
        retry: 2,
        enabled: hasValidId,
    })

    const [status, setStatus] = useState<string>("");

    const handleStatusChange = (newStatus: string | null) => {
        if (newStatus === null) return;

        setStatus(newStatus);
    }

    const handleUpdateStatus = () => {
        let applicationToUpdate = application;
        if (!applicationToUpdate) return;

        applicationToUpdate = {...applicationToUpdate, status: status as ApplicationStatus};

        updateApplication(applicationId, applicationToUpdate)
            .then(() => {refetch().then()})
            .catch((err) => {
                alert("Failed to update application status: " + err.message);
            });
    }

    const displayStatus = status || application?.status;

    return (
        <div>
            {isPending && <div className={"text-lg"}>Loading...</div>}
            {error && <div className={"text-lg text-red-400"}>Error: {error.message}</div>}
            {application && (
                <div className={"flex flex-col gap-4 w-1/2 mx-auto mt-4"}>
                    <h1 className={"text-2xl font-bold"}>{application.title}</h1>
                    <p><span className={"font-semibold"}>Company:</span> {application.company.name}</p>
                    {/*Should use a select here*/}
                    <Combobox items={APPLICATION_STATUSES} value={displayStatus} onValueChange={handleStatusChange}>
                        <ComboboxInput/>
                        <ComboboxContent>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                    {displayStatus !== application.status && (
                        <Button className={"w-1/2 mx-auto"} variant={"secondary"} onClick={handleUpdateStatus}>
                            Update Status
                        </Button>
                    )}
                    <p>{application.description}</p>
                    <Separator/>
                    <h2 className={"text-lg"}>Steps</h2>
                    <ScrollArea>
                        <div className={"flex flex-row gap-4"}>
                            {application.steps.map((step, index) => (
                                <div key={index} className={"border rounded-md p-2 shrink-0 w-1/3"}>
                                    <p><span className={"font-semibold"}>Step {index + 1}:</span> {step.title}</p>
                                    <p>{step.description}</p>
                                    <p>{step.date}</p>
                                    {step.time && <p>{step.time}</p>}
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation={"horizontal"}/>
                    </ScrollArea>
                    <AddStepDialog/>
                </div>
            )}
        </div>
    );
}

export default ApplicationDetailsPage;