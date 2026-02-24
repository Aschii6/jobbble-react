import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchCompanies} from "@/api/companies.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import CalendarWithTime from "@/components/calendar-with-time.tsx";
import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import type {Company} from "@/api/types.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";


function AddStepDialog() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string>("10:30:00");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState<Company | undefined>(undefined);

    const {isPending, error, data: companies} = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });

    const handleSubmit = () => {
        alert(`Step added with title: ${title}, description: ${description}, company: ${company}, date: ${date}, time: ${time}`);
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
                            {isPending && <div>Loading...</div>}
                            {error && <div>Error: {error.message}</div>}
                            {companies && (
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
                                    <Select
                                        value={company?.id?.toString()}
                                        onValueChange={(value) => {
                                            const selectedCompany = companies.find(c => c.id?.toString() === value);
                                            setCompany(selectedCompany);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Select company"}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company.id} value={company.id?.toString() || ""}>{company.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <CalendarWithTime
                                        date={date}
                                        onDateChange={setDate}
                                        time={time}
                                        onTimeChange={setTime}
                                    />
                                </FieldGroup>
                            )}
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