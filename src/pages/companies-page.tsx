import {useQuery} from "@tanstack/react-query";
import {fetchCompanies} from "@/api/companies.ts";
import {CompanyCard} from "@/components/company-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "@tanstack/react-router";

function CompaniesPage() {
    const {isPending, error, data: companies} = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });

    const navigate = useNavigate();

    const handleClickAdd = () => {
        navigate({
            to: "/companies/new",
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
            <h1 className={"text-2xl text-primary-foreground"}>Companies</h1>
            <div className={"grid grid-cols-2 gap-3 w-full"}>
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company}/>
                ))}
            </div>
            <Button
                type="button"
                onClick={handleClickAdd}
                className="fixed bottom-6 right-6 rounded-full h-16 w-16 hover:w-20 hover:h-20 text-lg shadow-[7px_7px_2px_rgba(0,0,0,0.2)]"
                aria-label="Add company"
            >
                +
            </Button>
        </div>
    );
}

export default CompaniesPage;