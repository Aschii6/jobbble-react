import {
    NavigationMenu,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu.tsx";

function NavBar() {
    return (
        <nav>
            <NavigationMenu>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
                <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
            </NavigationMenu>
        </nav>
    );
}

export default NavBar;