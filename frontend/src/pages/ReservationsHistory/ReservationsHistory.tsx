import { FC, useState } from "react";
import { ReservationStatusType } from "@/types/Reservation";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const ReservationsHistory: FC = () => {

  return (
    <div className="flex h-full flex-row gap-6">
      <ReservationsSideBar />
      <ReservationsList />
    </div>
  );
};

export default ReservationsHistory;
