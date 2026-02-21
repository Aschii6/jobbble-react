import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createCompany} from "@/api/companies.ts";
import type {Company} from "@/api/types.ts";
import {useNavigate} from "@tanstack/react-router";

// Making a proper, a la carte, form
function NewCompanyPage() {
    const navigate = useNavigate();

    const formSchema = z.object({
        name: z.string().min(4, "Company name must be at least 4 characters long"),
        description: z.string(),
        location: z.string(),
        websiteUrl: z.url({error: "Invalid URL format"}).or(z.literal("")),
        logoUrl: z.url({error: "Invalid URL format"}).or(z.literal("")),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            location: "",
            websiteUrl: "",
            logoUrl: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        const company: Omit<Company, "id"> = {
            name: data.name,
            description: data.description,
            location: data.location,
            websiteUrl: data.websiteUrl,
            logoUrl: data.logoUrl,
        }
        createCompany(company)
            .then(() => {
                navigate({
                    to: "/companies",
                }).then();
            })
            .catch((error) => {
                alert(`Failed to create company: ${error.message}`);
            });
    }

    return (
        <div className={"flex flex-col w-full max-w-2xl mx-auto gap-3"}>
            <h1 className={"text-2xl text-primary-foreground"}>New Company</h1>
            <form id={"form"} onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className={"gap-4"}>
                    <Controller name={"name"} control={form.control} render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Company Name</FieldLabel>
                            <Input
                                {...field}
                                id={"name"}
                                placeholder={"Enter company name"}
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
                                    placeholder={"Enter company description"}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"location"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Location</FieldLabel>
                                <Input
                                    {...field}
                                    id={"location"}
                                    placeholder={"Enter company location"}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"websiteUrl"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Website URL</FieldLabel>
                                <Input
                                    {...field}
                                    id={"websiteUrl"}
                                    placeholder={"Enter company website URL"}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"logoUrl"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Logo URL</FieldLabel>
                                <Input
                                    {...field}
                                    id={"logoUrl"}
                                    placeholder={"Enter company logo URL"}
                                />
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

export default NewCompanyPage;