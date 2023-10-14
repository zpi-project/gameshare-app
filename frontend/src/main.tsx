import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { URLS } from "@constants/urls";
import Dashboard from "@pages/Dashboard";
import Error from "@pages/Error";
import Settings from "@pages/Settings/Settings";
import User from "@pages/User/User";
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
        path: URLS.SETTINGS,
        element: <Settings />,
      },
      {
        path: `${URLS.USER}/:id`,
        element: <User />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);
