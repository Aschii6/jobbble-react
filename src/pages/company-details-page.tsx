import {useParams} from "@tanstack/react-router";

function CompanyDetailsPage() {
    const {companyId} = useParams({strict: false});
    return (
        <div className="max-w-4xl mx-auto p-4">
            {companyId}
        </div>
    );
}

export default CompanyDetailsPage;