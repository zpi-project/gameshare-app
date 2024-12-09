import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "@/ProtectedRoute";
import { URLS } from "@/constants/urls";
import CategoryGameSearch from "@/pages/CategoryGameSearch";
import Dashboard from "@/pages/Dashboard";
import Error from "@/pages/Error";
import Game from "@/pages/Game";
import GameInstance from "@/pages/GameInstance";
import GameRequests from "@/pages/GameRequests";
import GameSearch from "@/pages/GameSearch";
import MyProfile from "@/pages/MyProfile";
import ReservationDetails from "@/pages/ReservationDetails";
import ReservationsHistory from "@/pages/ReservationsHistory";
import UserProfile from "@/pages/UserProfile";
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
        handle: "Dashboard",
      },
      {
        path: URLS.CATEGORY_GAMES,
        element: <GameSearch />,
        handle: "Games",
      },
      {
        path: `${URLS.GAMES}/:gameId`,
        element: <Game />,
        handle: "Game Details",
      },
      {
        path: `${URLS.GAMES}/:gameId/:instanceId`,
        element: <GameInstance />,
        handle: "Game Instance",
      },
      {
        path: `${URLS.CATEGORY_GAMES}/:id`,
        element: <CategoryGameSearch />,
      },
      {
        path: `${URLS.CATEGORY_GAMES}/:id/:gameId`,
        element: <Game />,
        handle: "Game Details",
      },
      {
        path: `${URLS.CATEGORY_GAMES}/:id/:gameId/:instanceId`,
        element: <GameInstance />,
        handle: "Game Instance",
      },
      {
        path: `${URLS.PROFILE}/:userId`,
        element: <UserProfile />,
      },
      {
        path: `${URLS.PROFILE}/:userId/:instanceId`,
        element: <GameInstance />,
        handle: "Game Instance",
      },
      {
        element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
        children: [
          {
            path: URLS.MY_PROFILE,
            element: <MyProfile />,
            handle: "My Profile",
          },
          {
            path: URLS.MY_RESERVATIONS,
            element: <ReservationsHistory />,
            handle: "My Reservations",
          },
          {
            path: `${URLS.MY_RESERVATIONS}/:reservationId`,
            element: <ReservationDetails />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: URLS.GAME_REQUESTS,
            element: <GameRequests />,
            handle: "Game Requests",
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
