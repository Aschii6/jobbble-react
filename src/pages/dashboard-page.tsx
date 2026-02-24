import {Link} from "@tanstack/react-router";

function DashboardPage() {
    return (
        <div className={"flex flex-col"}>
            <h1>Dashboard</h1>
            <Link to={"/companies"}>
                View Companies
            </Link>
            <Link to={"/applications"}>
                View Applications
            </Link>
        </div>
    );
}

export default DashboardPage;

