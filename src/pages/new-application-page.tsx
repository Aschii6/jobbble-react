import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createApplication} from "@/api/applications.ts";
import type {ApplicationStatus} from "@/api/types.ts";
import {APPLICATION_STATUSES} from "@/api/types.ts";
import {useNavigate} from "@tanstack/react-router";
import {Select, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectContent} from "@/components/ui/select";
import {fetchCompanies} from "@/api/companies.ts";
import {useQuery} from "@tanstack/react-query";

function NewApplicationPage() {
    const navigate = useNavigate();

    const {isPending, error, data: companies} = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });

    const formSchema = z.object({
        title: z.string().min(3, "Application title must be at least 3 characters long"),
        description: z.string(),
        status: z.enum(APPLICATION_STATUSES),
        companyId: z.string().min(1, "Please select a company"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "NONE",
            companyId: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        const application = {
            title: data.title,
            description: data.description,
            status: data.status as ApplicationStatus,
            companyId: Number(data.companyId),
        };

        createApplication(application)
            .then(() => {
                navigate({
                    to: "/applications",
                }).then();
            })
            .catch((error) => {
                alert(`Failed to create application: ${error.message}`);
            });
    }

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={"flex flex-col w-full max-w-2xl mx-auto gap-3"}>
            <h1 className={"text-2xl text-primary-foreground"}>New Application</h1>
            <form id={"form"} onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className={"gap-4"}>
                    <Controller
                        name={"companyId"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Company</FieldLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Select company"}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies?.map((company) => (
                                                <SelectItem key={company.id}
                                                            value={company.id?.toString() || ""}>{company.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"title"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Application Title</FieldLabel>
                                <Input
                                    {...field}
                                    id={"title"}
                                    placeholder={"Enter application title"}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"description"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Description</FieldLabel>
                                <Input
                                    {...field}
                                    id={"description"}
                                    placeholder={"Enter application description"}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"status"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Status</FieldLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Select status"}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {APPLICATION_STATUSES.map((status) => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>
            <Field className={"my-4 w-2/3 mx-auto"}>
                <Button type={"submit"} form={"form"}>
                    Submit
                </Button>
            </Field>
        </div>
    );
}

export default NewApplicationPage;