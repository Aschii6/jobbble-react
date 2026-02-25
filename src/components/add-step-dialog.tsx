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


function AddStepDialog() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string>("10:30:00");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        alert(`Step added with title: ${title}, description: ${description}, date: ${date}, time: ${time}`);
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