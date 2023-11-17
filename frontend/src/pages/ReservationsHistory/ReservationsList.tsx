import { FC } from "react";
import { Reservation } from "@/types/Reservation";
import { Skeleton } from "@/components/ui/skeleton";
import ReservationCard from "./ReservationCard";

interface ReservationsListProps {
  reservations?: Reservation[];
  isLoading: boolean;
  noReservationsMessage: string;
}
const ReservationsList: FC<ReservationsListProps> = ({
  reservations,
  isLoading,
  noReservationsMessage,
}) => {
  return (
    <div className="flex flex-grow flex-col gap-4 rounded-lg bg-section p-4">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="rounded-lg" />
          ))}
        </>
      ) : reservations && reservations.length ? (
        <>
          {reservations.map((reservation, id) => (
            <ReservationCard reservation={reservation} key={id} />
          ))}
        </>
      ) : (
        <h3 className="mt-4 text-center text-xl">{noReservationsMessage}</h3>
      )}
    </div>
  );
};

export default ReservationsList;
