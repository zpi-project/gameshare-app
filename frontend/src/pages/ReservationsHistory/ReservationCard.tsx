import { FC } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Reservation } from "@/types/Reservation";
import { Separator } from "@/components/ui/separator";

interface ReservationCardProps {
  reservation: Reservation;
}
const ReservationCard: FC<ReservationCardProps> = ({
  reservation: {
    reservationId,
    gameInstance: {
      images,
      game: { image, name },
    },
  },
}) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-lg bg-card p-4 duration-200 hover:bg-accent"
      to={`${URLS.MY_RESERVATIONS}/${reservationId}`}
    >
      <div className="h-40 w-40 overflow-hidden rounded-lg">
        <img
          src={images[0]?.link ?? image}
          alt={`${name} image`}
          className="h-full w-full object-cover object-top"
        />
          </div>
          <section>
              <div></div>
            <Separator />  
          </section>
    </Link>
  );
};

export default ReservationCard;
