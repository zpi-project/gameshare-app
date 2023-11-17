import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ReservationQueryParams } from "@/types/Reservation";
import { ReservationsApi } from "@/api/ReservationsApi";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const ReservationsHistory: FC = () => {
  const [queryParams, setQueryParams] = useState<ReservationQueryParams>({
    asOwner: true,
    status: undefined,
  });
  const navigate = useNavigate();

  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservations", queryParams],
    queryFn: () => ReservationsApi.getAll(0, 10, queryParams),
    onError: () => {},
  });

  return (
    <div className="flex h-full flex-row gap-6">
      <ReservationsSideBar setQueryParams={setQueryParams} />
      <ReservationsList reservations={reservations?.results} isLoading={isLoading} />
    </div>
  );
};

export default ReservationsHistory;
