import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { URLS } from "@/constants/urls";
import CategoryGameSearch from "@/pages/CategoryGameSearch";
import Dashboard from "@/pages/Dashboard";
import Error from "@/pages/Error";
import GameSearch from "@/pages/GameSearch";
import MyProfile from "@/pages/MyProfile";
import UserProfile from "@/pages/UserProfile";
import ProtectedRoute from "@/components/ProtectedRoute";
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
        element: <GameSearch />,
      },
      {
        path: `${URLS.GAMES}/:id`,
        element: <div>game page</div>,
      },
      {
        path: `${URLS.CATEGORY_GAMES}/:id`,
        element: <CategoryGameSearch />,
      },
      {
        path: `${URLS.GAME_INSTANCE}/:id`,
        element: <div>game instance page</div>,
      },
      {
        path: `${URLS.PROFILE}/:id`,
        element: <UserProfile />,
      },
      {
        element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
        children: [
          {
            path: URLS.MY_PROFILE,
            element: <MyProfile />,
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
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: URLS.GAME_REQUESTS,
            element: <div>admin game requests</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
