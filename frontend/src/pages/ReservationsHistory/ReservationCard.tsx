import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Reservation } from "@/types/Reservation";
import { getFullname } from "@/utils/user";
import { PriceBadge } from "@/components/Badge";
import Stars from "@/components/Stars";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ReservationCardProps {
  reservation: Reservation;
  asOwner: boolean;
}
const ReservationCard: FC<ReservationCardProps> = ({
  reservation: {
    reservationId,
    status: { status },
    startDate,
    endDate,
    duration,
    gameInstance: {
      images,
      game: { image, name },
      pricePerDay,
      owner,
    },
    renter,
  },
  asOwner,
}) => {
  const { t } = useTranslation();
  const { avatarLink: ownerAvatar, avgRating: ownerRating } = owner;
  const { avatarLink: renterAvatar, avgRating: renterRating } = renter;

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
      <section className="flex flex-grow flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-2">
          <h3 className="mr-auto text-2xl">{name}</h3>
          <Badge variant="secondary" className="lowercase">
            {t(`reservationStatuses.${asOwner ? "owner" : "renter"}.${status}`)}
          </Badge>
          <PriceBadge price={pricePerDay} />
        </div>
        <Separator />
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <img
                src={asOwner ? renterAvatar : ownerAvatar}
                alt={getFullname(asOwner ? renter : owner)}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex h-full flex-col gap-1 ">
              <h4 className="text-xl">{getFullname(asOwner ? renter : owner)}</h4>
              {<Stars count={Math.round(asOwner ? renterRating : ownerRating)} size={24} />}
            </div>
          </div>
          <div className="flex min-w-[300px] flex-row justify-between gap-4">
            <div>
              <p>{t("reservationNumber")}</p>
              <p>{t("startDate")}</p>
              <p>{t("endDate")}</p>
              <p>{t("days")}</p>
            </div>
            <div className="text-right">
              <p>{reservationId}</p>
              <p>{t("dateFormat", { date: new Date(startDate) })}</p>
              <p>{t("dateFormat", { date: new Date(endDate) })}</p>
              <p>{duration}</p>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default ReservationCard;
