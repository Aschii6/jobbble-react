import {createRootRoute, createRoute, Outlet} from "@tanstack/react-router";
import Home from "@/pages/home.tsx";
import Login from "@/pages/login.tsx";
import Signup from "@/pages/signup.tsx";
import Dashboard from "@/pages/dashboard.tsx";
import {requireAuth} from "@/lib/auth.ts";
import NavBar from "@/components/nav-bar.tsx";

const rootRoute = createRootRoute({
    component: () => (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login,
});

const signupRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/signup",
    component: Signup,
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: Dashboard,
    beforeLoad: ({location}) => requireAuth(location.pathname),
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    signupRoute,
    dashboardRoute,
])

export {routeTree}