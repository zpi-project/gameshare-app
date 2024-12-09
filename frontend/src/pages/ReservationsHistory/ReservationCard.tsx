import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { RESERVATION_STATUS_COLORS } from "@/constants/reservationStatuses";
import { URLS } from "@/constants/urls";
import { Reservation } from "@/types/Reservation";
import { getFullname } from "@/utils/user";
import { UserApi } from "@/api/UserApi";
import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ReservationCardProps {
  reservation: Reservation;
  asOwner: "all" | "owner" | "renter";
}
const ReservationCard: FC<ReservationCardProps> = ({
  reservation: {
    reservationId,
    status,
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
  const {
    avatarLink: ownerAvatar,
    avgRating: ownerRating,
    opinionsAmount: ownerOpinionsAmount,
  } = owner;
  const {
    avatarLink: renterAvatar,
    avgRating: renterRating,
    opinionsAmount: renterOpinionsAmount,
  } = renter;

  const opinionsAmount = asOwner ? renterOpinionsAmount : ownerOpinionsAmount;
  const rating = asOwner ? renterRating : ownerRating;
  const role = useRecoilValue(roleState);

  const { data: myUser } = useQuery({
    queryKey: ["user"],
    queryFn: UserApi.get,
    enabled: role !== "guest",
  });

  const isMyGame = myUser?.uuid === owner?.uuid;

  return (
    <Link
      className="flex flex-row gap-4 rounded-lg bg-card p-4 duration-200 hover:bg-accent"
      to={`${URLS.MY_RESERVATIONS}/${reservationId}`}
    >
      <div className="relative h-40 w-20 rounded-lg md:w-32 2xl:w-40">
        <div className="h-40 w-20 overflow-hidden rounded-lg md:w-32 2xl:w-40">
          <img
            src={images[0]?.link ?? image}
            alt={`${name} image`}
            className="h-full w-full object-cover object-top"
          />
        </div>
        {isMyGame && <Badge className="absolute -left-0.5 -top-0.5 shadow-md">{t("myGame")}</Badge>}
      </div>
      <section className="flex flex-grow flex-col gap-4">
        <div className="flex flex-row flex-wrap justify-end gap-2">
          <h3 className="mr-auto text-2xl">{name}</h3>
          <Badge variant="secondary" className={`lowercase ${RESERVATION_STATUS_COLORS[status]}`}>
            {t(`reservationStatuses.${isMyGame ? "owner" : "renter"}.${status}`)}
          </Badge>
          <PriceBadge price={pricePerDay} />
        </div>
        <Separator />
        <div className="flex flex-row justify-between gap-2">
          <div className="hidden flex-row gap-3 lg:flex">
            <div className="h-16 w-16 overflow-hidden rounded-full xl:h-20 xl:w-20">
              <img
                src={asOwner ? renterAvatar : ownerAvatar}
                alt={getFullname(isMyGame ? renter : owner)}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden h-full flex-col gap-1 2xl:flex ">
              <h4 className="text-xl">{getFullname(isMyGame ? renter : owner)}</h4>
              <Badge className="w-max">{isMyGame ? t("renter") : t("owner")}</Badge>
              <>
                {opinionsAmount > 0 ? (
                  <div className="flex flex-row gap-2">
                    <p className="text-base tracking-widest text-foreground">({opinionsAmount})</p>
                    <Stars count={Math.round(rating)} variant="secondary" />
                  </div>
                ) : (
                  <Badge variant="secondary" className="w-max px-3 py-1">
                    {t("noOpinions")}
                  </Badge>
                )}
              </>
            </div>
          </div>
          <div className="w-full lg:w-max lg:min-w-[300px]">
            <div className="flex flex-row justify-between gap-4">
              <p>{t("reservationNumber")}</p>
              <p>{reservationId}</p>
            </div>
            <div className="flex flex-row justify-between gap-4">
              <p>{t("startDate")}</p>
              <p>{t("dateFormat", { date: new Date(startDate) })}</p>
            </div>
            <div className="flex flex-row justify-between gap-4">
              <p>{t("endDate")}</p>
              <p>{t("dateFormat", { date: new Date(endDate) })}</p>
            </div>
            <div className="flex flex-row justify-between gap-4">
              <p>{t("days")}</p>
              <p>{duration}</p>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default ReservationCard;
