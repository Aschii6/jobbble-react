import {createRootRoute, createRoute, Outlet} from "@tanstack/react-router";
import HomePage from "@/pages/home-page.tsx";
import LoginPage from "@/pages/login-page.tsx";
import SignupPage from "@/pages/signup-page.tsx";
import DashboardPage from "@/pages/dashboard-page.tsx";
import {requireAuth} from "@/lib/auth.ts";
import NavBar from "@/components/nav-bar.tsx";
import CompaniesPage from "@/pages/companies-page.tsx";
import CompanyDetailsPage from "@/pages/company-details-page.tsx";
import NewCompanyPage from "@/pages/new-company-page.tsx";
import ApplicationsPage from "@/pages/applications-page.tsx";
import ApplicationDetailsPage from "@/pages/application-details-page.tsx";
import NewApplicationPage from "@/pages/new-application-page.tsx";

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
    component: HomePage,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
});

const signupRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/signup",
    component: SignupPage,
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: DashboardPage,
    beforeLoad: ({location}) => requireAuth(location.pathname),
});

const companiesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/companies",
    component: CompaniesPage,
    beforeLoad: ({location}) => requireAuth(location.pathname),
});

const addCompanyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/companies/new",
    component: NewCompanyPage,
    beforeLoad: ({location}) => requireAuth(location.pathname),
});

const companyDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/companies/$companyId",
    component: CompanyDetailsPage,
    beforeLoad: ({location}) => requireAuth(location.pathname),
});

const applicationsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/applications",
    component: ApplicationsPage,
    beforeLoad: ({location}) => requireAuth(location.pathname),
});

const addApplicationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/applications/new",
    component: NewApplicationPage,
    beforeLoad: ({location}) => requireAuth(location.pathname),
})

const applicationDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/applications/$applicationId",
    component: ApplicationDetailsPage,
    beforeLoad: ({location}) => requireAuth(location.pathname),
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    signupRoute,
    dashboardRoute,
    companiesRoute,
    addCompanyRoute,
    companyDetailsRoute,
    applicationsRoute,
    addApplicationRoute,
    applicationDetailsRoute,
])

export {routeTree}