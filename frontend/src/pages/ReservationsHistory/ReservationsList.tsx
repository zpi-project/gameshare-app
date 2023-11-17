import { FC } from "react";
import { Reservation } from "@/types/Reservation";
import { Skeleton } from "@/components/ui/skeleton";
import ReservationCard from "./ReservationCard";

interface ReservationsListProps {
  reservations?: Reservation[];
  isLoading: boolean;
  noReservationsMessage: string;
  asOwner: boolean;
}
const ReservationsList: FC<ReservationsListProps> = ({
  reservations,
  isLoading,
  noReservationsMessage,
  asOwner,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-[192px] rounded-lg" />
          ))}
        </>
      ) : reservations && reservations.length ? (
        <>
          {reservations.map((reservation, id) => (
            <ReservationCard reservation={reservation} key={id} asOwner={asOwner} />
          ))}
        </>
      ) : (
        <h3 className="mt-4 text-center text-xl">{noReservationsMessage}</h3>
      )}
    </div>
  );
};

export default ReservationsList;
