import './App.css'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {routeTree} from "@/routeTree.tsx";

const queryClient = new QueryClient();
const router = createRouter({routeTree});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
