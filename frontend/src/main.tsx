import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { URLS } from "@/constants/urls";
import Dashboard from "@/pages/Dashboard";
import Error from "@/pages/Error";
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
        path: URLS.SEARCH_GAMES,
        element: <div>search games page</div>,
      },
      {
        path: `${URLS.USER}/:id`,
        element: <div>user page</div>,
      },
      {
        path: URLS.SETTINGS,
        element: <div>my settings page</div>,
      },
      {
        path: URLS.RESERVATIONS,
        element: <div>my reservations page</div>,
      },
      {
        path: URLS.GAMES,
        element: <div>my games page</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
