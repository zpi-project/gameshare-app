import { FC } from "react";
import { ReservationDetails } from "@/types/Reservation";

interface ReservationDetailsOwnerProps {
  reservation: ReservationDetails;
}

const ReservationDetailsOwner: FC<ReservationDetailsOwnerProps> = ({reservation}) => {
  return <div>owner ReservationDetails</div>;
};

export default ReservationDetailsOwner;
