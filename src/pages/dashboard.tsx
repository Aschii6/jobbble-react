import { useAuthActions } from "@/stores/auth-store";
import { useNavigate } from "@tanstack/react-router";

function Dashboard() {
    const { clearAccessToken } = useAuthActions();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAccessToken();
        navigate({to: "/login"}).then();
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;

