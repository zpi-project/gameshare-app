import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { URLS } from "@/constants/urls";
import Dashboard from "@/pages/Dashboard";
import Error from "@/pages/Error";
import Settings from "@/pages/Settings";
import User from "@/pages/User";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: URLS.GAMES,
        element: <div>search games page</div>,
      },
      {
        path: `${URLS.PROFILE}/:id`,
        element: <User />,
      },
      {
        path: URLS.MY_PROFILE,
        element: <Settings />,
      },
      {
        path: URLS.MY_RESERVATIONS,
        element: <div>my reservations page</div>,
      },
      {
        path: URLS.MY_GAMES_INSTANCES,
        element: <div>my game instances page</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
