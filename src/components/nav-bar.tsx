import {
    NavigationMenu, NavigationMenuLink,
} from "@/components/ui/navigation-menu.tsx";
import {Link, useLocation, useNavigate} from "@tanstack/react-router";
import {useAccessToken, useAuthActions} from "@/stores/auth-store.ts";
import {Button} from "@/components/ui/button.tsx";

function NavBar() {
    const location = useLocation();
    const accessToken = useAccessToken();
    const {clearAccessToken} = useAuthActions();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAccessToken();
        navigate({to: "/login"}).then();
    };

    return (
        <nav className={"w-full bg-primary flex text-primary-foreground p-1 justify-between"}>
            <div className="flex">
                <img src={"./jobbble-logo-dark.png"} alt={"Logo"} width={64} className={"mx-2"}/>
                <NavigationMenu className={"mx-2 gap-2"}>
                    <NavigationMenuLink className={"border rounded-xl bg-secondary text-secondary-foreground text-xl"} asChild>
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className={"border rounded-xl bg-secondary text-secondary-foreground text-xl"} asChild>
                        <Link to="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                </NavigationMenu>
            </div>
            {
                accessToken ? (
                    <div className={"flex items-center mx-2"}>
                        <Button variant={"destructive"} className={"border rounded-xl text-xl h-max"} onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <NavigationMenu className={"mx-2"}>
                        <NavigationMenuLink className={"border rounded-xl bg-secondary text-secondary-foreground text-xl"}
                                            asChild>
                            {
                                location.pathname === "/login" ? (
                                    <Link to="/signup">Signup</Link>
                                ) : (
                                    <Link to="/login">Login</Link>
                                )
                            }
                        </NavigationMenuLink>
                    </NavigationMenu>
                )
            }
        </nav>
    );
}

export default NavBar;