import { ReservationDetails } from "@/types/Reservation";
import { FC } from "react";

interface ReservationDetailsRenterProps {
  reservation: ReservationDetails;
}

const ReservationDetailsRenter: FC<ReservationDetailsRenterProps> = ({reservation}) => {
  return <div>renter ReservationDetails</div>;
};

export default ReservationDetailsRenter;
