import { FC } from "react";
import { Reservation } from "@/types/Reservation";
import ReservationCard from "./ReservationCard";

interface ReservationsListProps {
  reservations?: Reservation[];
  isLoading: boolean;
}
const ReservationsList: FC<ReservationsListProps> = ({ reservations, isLoading }) => {
  return (
    <div className="flex-grow rounded-lg bg-section p-4">
      {isLoading ? (
        <>is loading</>
      ) : reservations && reservations.length ? (
        <>
          {reservations.map((reservation, id) => (
            <ReservationCard reservation={reservation} key={id} />
          ))}
        </>
      ) : (
        <>empty list</>
      )}
    </div>
  );
};

export default ReservationsList;
