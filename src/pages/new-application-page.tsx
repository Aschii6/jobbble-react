import {useState} from "react";
import type {Company} from "@/api/types.ts";
import {Select, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectContent} from "@/components/ui/select";
import {fetchCompanies} from "@/api/companies.ts";
import {useQuery} from "@tanstack/react-query";

function NewApplicationPage() {
    const [company, setCompany] = useState<Company | undefined>(undefined);

    const {isPending, error, data: companies} = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
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
                            <SelectItem key={company.id}
                                        value={company.id?.toString() || ""}>{company.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default NewApplicationPage;