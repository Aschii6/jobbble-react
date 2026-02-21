import {useQuery} from "@tanstack/react-query";
import {fetchCompanies} from "@/api/companies.ts";
import {CompanyCard} from "@/components/company-card.tsx";

function CompaniesPage() {
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
        <div className={"p-4 w-full max-w-3xl mx-auto flex flex-col items-center gap-4"}>
            <h1 className={"text-2xl text-primary-foreground"}>Companies</h1>
            <div className={"grid grid-cols-2 gap-3 w-full"}>
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company}/>
                ))}
            </div>
        </div>
    );
}

export default CompaniesPage;