import {Link} from "@tanstack/react-router";

function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to={"/companies"}>
                View Companies
            </Link>
        </div>
    );
}

export default DashboardPage;

