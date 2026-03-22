import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminPage } from "./pages/AdminPage";
import { GalleryPage } from "./pages/GalleryPage";
import { PaintingFormPage } from "./pages/PaintingFormPage";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: GalleryPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const adminNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/new",
  component: () => <PaintingFormPage mode="new" />,
});

const adminEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/edit/$id",
  component: () => <PaintingFormPage mode="edit" />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  adminNewRoute,
  adminEditRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
