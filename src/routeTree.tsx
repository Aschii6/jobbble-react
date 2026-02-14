import {createRootRoute, createRoute} from "@tanstack/react-router";

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div>Home</div>
})

const routeTree = rootRoute.addChildren([
    indexRoute,
])

export { routeTree }