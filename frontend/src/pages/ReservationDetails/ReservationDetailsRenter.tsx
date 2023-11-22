import { FC } from "react";
import { ReservationDetails } from "@/types/Reservation";

interface ReservationDetailsRenterProps {
  reservation: ReservationDetails;
}

const ReservationDetailsRenter: FC<ReservationDetailsRenterProps> = ({ reservation }) => {
  return <div>renter ReservationDetails</div>;
};

export default ReservationDetailsRenter;
