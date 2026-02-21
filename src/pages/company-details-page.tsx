import {useNavigate, useParams} from "@tanstack/react-router";
import {useQuery} from "@tanstack/react-query";
import {fetchCompanyById, deleteCompanyById} from "@/api/companies.ts";
import {Button} from "@/components/ui/button.tsx";

function CompanyDetailsPage() {
    const {companyId} = useParams({from: "/companies/$companyId"});
    const parsedCompanyId = Number(companyId);
    const hasValidId = Number.isFinite(parsedCompanyId);
    const navigate = useNavigate();

    const {isPending, error, data: company} = useQuery({
        queryKey: ["company", parsedCompanyId],
        queryFn: () => fetchCompanyById(parsedCompanyId),
        refetchOnWindowFocus: false,
        retry: 2,
        enabled: hasValidId,
    });

    const handleDelete = () => {
        if (!hasValidId) return;

        if (!window.confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
            return;
        }

        deleteCompanyById(parsedCompanyId)
            .then(() => {
                navigate({
                    to: "/companies",
                }).then();
            })
            .catch((err) => {
                alert(`Failed to delete company: ${err.message}`);
            })
    }

    return (
        <div className={"w-full flex justify-center p-4"}>
            {isPending && <div className={"text-lg"}>Loading...</div>}
            {error && <div className={"text-lg text-red-400"}>Error: {error.message}</div>}
            {company && (
                <div className={"flex flex-col w-full gap-4"}>
                    <div className={"grid grid-cols-2 items-center w-full"}>
                        <h1 className={"text-2xl font-bold"}>{company.name}</h1>
                        {company.logoUrl &&
                            <div className="flex justify-end">
                                <img src={company.logoUrl} alt={`${company.name} logo`}
                                     className={"max-w-1/2 max-h-32 object-contain"}/>
                            </div>
                        }
                    </div>
                    <div className={"flex flex-col items-start gap-4 text-xl"}>
                        <p><span className={"font-semibold"}>Description:</span> {company.description}</p>
                        <p><span className={"font-semibold"}>Location:</span> {company.location}</p>
                        {company.websiteUrl &&
                            <p>
                                <span className={"font-semibold"}>Website:</span>
                                <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer"
                                   className="text-blue-500 ml-1">
                                    {company.websiteUrl}
                                </a>
                            </p>
                        }
                    </div>
                    <div className={"flex flex-col w-1/6"}>
                        <Button variant={"destructive"}
                                className={"border rounded-xl text-lg mt-2 py-6"}
                                onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompanyDetailsPage;