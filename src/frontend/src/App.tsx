import { Layout } from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const IndustriesPage = lazy(() => import("@/pages/IndustriesPage"));
const ShapesPage = lazy(() => import("@/pages/ShapesPage"));
const SolutionsPage = lazy(() => import("@/pages/SolutionsPage"));
const PartnersPage = lazy(() => import("@/pages/PartnersPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

function PageFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: "oklch(0.75 0.12 195)",
            borderRightColor: "oklch(0.75 0.12 195 / 0.3)",
          }}
        />
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <HomePage />
      </Suspense>
    </Layout>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <AboutPage />
      </Suspense>
    </Layout>
  ),
});

const industriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/industries",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <IndustriesPage />
      </Suspense>
    </Layout>
  ),
});

const shapesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shapes",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <ShapesPage />
      </Suspense>
    </Layout>
  ),
});

const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <SolutionsPage />
      </Suspense>
    </Layout>
  ),
});

const partnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partners",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <PartnersPage />
      </Suspense>
    </Layout>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <BlogPage />
      </Suspense>
    </Layout>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <ContactPage />
      </Suspense>
    </Layout>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Layout hideFooter>
      <Suspense fallback={<PageFallback />}>
        <AdminPage />
      </Suspense>
    </Layout>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  industriesRoute,
  shapesRoute,
  solutionsRoute,
  partnersRoute,
  blogRoute,
  contactRoute,
  adminRoute,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
