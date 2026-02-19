import {
    NavigationMenu,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu.tsx";
import {Link} from "@tanstack/react-router";

function NavBar() {
    return (
        <nav>
            <NavigationMenu>
                <NavigationMenuLink asChild>
                    <Link to="/">Home</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                    <Link to="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
            </NavigationMenu>
        </nav>
    );
}

export default NavBar;