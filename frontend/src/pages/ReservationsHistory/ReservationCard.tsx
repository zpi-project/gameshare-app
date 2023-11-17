import { FC } from "react";
import { Reservation } from "@/types/Reservation";

interface ReservationCardProps {
  reservation: Reservation;
}
const ReservationCard: FC<ReservationCardProps> = ({ reservation }) => {
  return <div className="rounded-lg bg-card">fd</div>;
};

export default ReservationCard;
