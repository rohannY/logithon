import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/dashboard",
    lazy: async () => {
      const AppShell = await import("./pages/dashboard/sidebar/layout");
      return { Component: AppShell.default };
    },
    children: [
      // {
      //   index: true,
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/stats/index")).default,
      //   }),
      // },
      // {
      //   path: "jobs",
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/jobs/index")).default,
      //   }),
      // },
      // {
      //   path: "post-job",
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/add-jobs/addJobs"))
      //       .default,
      //   }),
      // },
      // {
      //   path: "applied",
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/applied/index")).default,
      //   }),
      // },
      // {
      //   path: "profiles",
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/profile/index")).default,
      //   }),
      // },
      // {
      //   path: "view-application",
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/view-application/index"))
      //       .default,
      //   }),
      // },
    ],
  },
  //auth
  {
    path: "/login",
    lazy: async () => ({
      Component: (await import("./pages/auth/signIn")).default,
    }),
  },
  {
    path: "/register",
    lazy: async () => ({
      Component: (await import("./pages/auth/signUp")).default,
    }),
  },

  {
    path: "/",
    lazy: async () => ({
      Component: (await import("./pages/landing/homepage")).default,
    }),
  },
]);

export default router;
