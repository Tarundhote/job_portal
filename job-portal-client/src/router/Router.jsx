import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import CreateJob from "../pages/CreateJob";
import UpdateJob from "../pages/UpdateJob";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

// ✅ Backend Base URL (Render)
const API_URL = "https://job-portal-3-sum1.onrender.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-job",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/salary",
        element: <SalaryPage />,
      },
      {
        path: "/post-job",
        element: (
          <PrivateRoute>
            <CreateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-job/:id",
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${API_URL}/all-jobs/${params.id}`),
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
        loader: ({ params }) =>
          fetch(`${API_URL}/all-jobs/${params.id}`),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
]);

export default router;
