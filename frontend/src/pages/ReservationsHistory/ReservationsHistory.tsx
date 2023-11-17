import { FC } from "react";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const ReservationsHistory: FC = () => {
  return (
    <div className="flex flex-row gap-4">
      <ReservationsSideBar />
      <ReservationsList />
    </div>
  );
};

export default ReservationsHistory;
