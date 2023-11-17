import { FC } from "react";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const ReservationsHistory: FC = () => {
  return (
    <div className="flex flex-row gap-6 h-full">
      <ReservationsSideBar />
      <ReservationsList />
    </div>
  );
};

export default ReservationsHistory;
