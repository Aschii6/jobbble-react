import type {Company} from "@/api/types.ts";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

type CompanyCardProps = {
    company: Company;
};

export function CompanyCard({company}: CompanyCardProps) {
    /*return (
        <div className="w-full border rounded-lg p-2 text-lg">
            <div className={"grid grid-cols-2 gap-3 w-full"}>
                <h2 className="font-bold">{company.name}</h2>
                {company.logoUrl && <img src={company.logoUrl} alt={`${company.name} logo`} className="max-w-full max-h-full object-contain" />}
            </div>
            <div className={"flex flex-col items-center gap-2"}>
                <p>Description: {company.description}</p>
                <p>Location: {company.location}</p>
                {company.websiteUrl && <p>Website: <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{company.websiteUrl}</a></p>}
            </div>
        </div>
    );*/

    return (
        <Card>
            <CardHeader className={"grid grid-cols-2 items-center"}>
                <CardTitle className={"text-xl font-bold"}>
                    {company.name}
                </CardTitle>
                {company.logoUrl && (
                    <div className="flex justify-end items-center h-16">
                        <img src={company.logoUrl} alt={`${company.name} logo`}
                             className="max-w-full max-h-full object-contain"/>
                    </div>
                )}
            </CardHeader>
            <CardContent className={"text-lg"}>
                    <p>Description: {company.description}</p>
                    <p>Location: {company.location}</p>
                    {company.websiteUrl &&
                        <p>Website: <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer"
                                       className="text-blue-500">{company.websiteUrl}</a></p>}
                <CardAction>
                    <Link to="/companies/$companyId" params={{companyId: company.id}}>
                        <Button variant={"outline"} className={"border rounded-xl text-lg h-max mt-2"}>View Details</Button>
                    </Link>
                </CardAction>
            </CardContent>
        </Card>
    );
}
