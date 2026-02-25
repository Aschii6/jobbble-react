import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import CalendarWithTime from "@/components/calendar-with-time.tsx";
import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import type {NoInfer, QueryObserverResult, Register} from "@tanstack/react-query";
import type {Application} from "@/api/types.ts";
import {addApplicationStep} from "@/api/applications.ts";
import {useParams} from "@tanstack/react-router";


interface AddStepDialogProps {
    onStepAdded?: () => Promise<QueryObserverResult<NoInfer<Application>, Register extends {
        defaultError: infer TError
    } ? TError : Error>>
}

function AddStepDialog({onStepAdded}: AddStepDialogProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string>("10:30");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const {applicationId} = useParams({from: "/applications/$applicationId"});
    const parsedApplicationId = Number(applicationId);
    const hasValidId = Number.isFinite(parsedApplicationId);

    const handleSubmit = () => {
        if (!hasValidId) {
            alert("Invalid application ID");
            return;
        }

        addApplicationStep(parsedApplicationId, {
            title,
            description,
            date: date ? date.toISOString().split("T")[0] : null,
            time,
        })
            .then(() => {
                onStepAdded?.();
                // Reset form state
                setTitle("");
                setDescription("");
                setDate(new Date());
                setTime("10:30");

                alert("Successfully added!");
            })
            .catch((err) => {
                alert("Failed to add step: " + err.message);
            });
    }

    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}>Add Step</Button>
                    </DialogTrigger>
                    <DialogContent className={"max-h-[90vh] py-4"}>
                        <DialogHeader>
                            <DialogTitle>
                                Step information
                            </DialogTitle>
                            {/*<DialogDescription>
                            </DialogDescription>*/}
                        </DialogHeader>
                        <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor={"title"}>Title</Label>
                                    <Input
                                        id={"title"}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor={"description"}>Description</Label>
                                    <Input
                                        id={"description"}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Field>
                                <CalendarWithTime
                                    date={date}
                                    onDateChange={setDate}
                                    time={time}
                                    onTimeChange={setTime}
                                />
                            </FieldGroup>
                            <Button type={"submit"} className={"mt-4"} onClick={handleSubmit}>
                                Add Step
                            </Button>
                        </ScrollArea>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default AddStepDialog;