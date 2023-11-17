import { FC, useState } from "react";
import { ReservationQueryParams } from "@/types/Reservation";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const ReservationsHistory: FC = () => {
  const [queryParams, setQueryParams] = useState<ReservationQueryParams>({
    asOwner: true,
    status: undefined,
  });

  return (
    <div className="flex h-full flex-row gap-6">
      <ReservationsSideBar setQueryParams={setQueryParams} />
      <ReservationsList />
    </div>
  );
};

export default ReservationsHistory;
