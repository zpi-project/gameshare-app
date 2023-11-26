import { FC } from "react";
import { ReservationDetails } from "@/types/Reservation";

interface ReservationDetailsProps {
  reservation: ReservationDetails;
}
const ReservationDetailsRenter: FC<ReservationDetailsProps> = ({ reservation }) => {
  return <div>ReservationDetailsRenter</div>;
};

export default ReservationDetailsRenter;
