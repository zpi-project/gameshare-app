import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReservationDetails } from "@/types/Reservation";
import { Map, LocationMarker } from "@/components/Map";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameInstanceDetails from "../GameInstanceDetails";
import OpinionSection from "../OpinionSection";
import ReservationDetailsStatus from "../ReservationDetailsStatus";
import ReservationDetailsTable from "../ReservationDetailsTable";
import UserDetailsSection from "../UserDetailsSection";
import OpinionAboutGameIntance from "./OpinionAboutGameInstance";
import OpinionAboutOwner from "./OpinionAboutOwner";

interface ReservationDetailsRenterProps {
  reservation: ReservationDetails;
}

const ReservationDetailsRenter: FC<ReservationDetailsRenterProps> = ({
  reservation: {
    reservation: {
      reservationId,
      startDate,
      endDate,
      duration,
      renterComment,
      renter,
      gameInstance,
      status,
    },
    ownerOpinion,
    renterOpinion,
    gameInstanceOpinion,
    canAddOwnerOpinion,
    canAddGameInstanceOpinion,
  },
}) => {
  const { t } = useTranslation();

  return (
    <ScrollArea className="h-full w-full xl:h-max">
      <div className="flex h-full w-full flex-col gap-4 xl:h-[calc(100vh-48px)] xl:flex-row">
        <ScrollArea className="h-full flex-grow">
          <div className="flex flex-col gap-4 xl:min-h-[calc(100vh-48px)]">
            <div className="relative flex-grow rounded-lg bg-section p-8">
              <div
                className="absolute left-4 right-4 top-4 h-1/2 rounded-lg opacity-50 dark:opacity-40"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(133, 43, 130) 100%)`,
                }}
              />
              <div className="relative flex h-full flex-col gap-8">
                <h1 className="text-xl uppercase">{t("reservationHeader", { reservationId })}</h1>
                <ReservationDetailsTable
                  reservationId={reservationId}
                  startDate={startDate}
                  endDate={endDate}
                  duration={duration}
                />
                <ReservationDetailsStatus
                  reservationId={reservationId}
                  status={status}
                  user="renter"
                />
                <div className="flex flex-grow flex-col gap-2">
                  <h3 className="text-xl">{t("reservationDetails.renter.renterMessage")}</h3>
                  <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
                    {renterComment ? renterComment : t("reservationDetails.renter.renterNoMessage")}
                  </p>
                </div>
              </div>
            </div>
            <OpinionAboutOwner
              ownerOpinion={ownerOpinion}
              canAddOwnerOpinion={canAddOwnerOpinion}
            />
            <OpinionAboutGameIntance
              gameInstanceOpinion={gameInstanceOpinion}
              canAddGameInstanceOpinion={canAddGameInstanceOpinion}
            />
          </div>
        </ScrollArea>
        <ScrollArea className="h-full flex-grow">
          <div className="flex flex-col gap-4 xl:min-h-[calc(100vh-48px)]">
            <div className="relative flex-grow rounded-lg bg-section p-8">
              <div
                className="absolute left-4 right-4 top-4 h-1/2 rounded-lg opacity-50 dark:opacity-40"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(133, 43, 130) 100%)`,
                }}
              />
              <UserDetailsSection
                user={renter}
                title={t("reservationDetails.renter.userDetails")}
                btnText={t("seeProfile")}
              />
            </div>
            <OpinionSection
              opinion={renterOpinion}
              opinionHeader={t("reservationDetails.renter.renterOpinion")}
              noOpinionMessage={t("noRenterOpinion")}
            />
          </div>
        </ScrollArea>
        <ScrollArea className="h-full xl:max-w-[33%]">
          <div className="relative flex flex-grow flex-col gap-4 rounded-lg bg-section p-4">
            <div
              className="absolute left-4 right-4 top-4 h-1/3 rounded-lg opacity-50 dark:opacity-40"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(133, 43, 130) 100%)`,
              }}
            />
            <div className="relative flex flex-grow items-center justify-between gap-8 p-4 xl:min-h-[calc(100vh-80px)] xl:flex-col xl:gap-4">
              <GameInstanceDetails gameInstance={gameInstance} />
              <div className="flex h-[300px] w-full flex-grow flex-col gap-2 overflow-hidden rounded-lg xl:h-[500px]">
                <Map
                  location={[
                    gameInstance.owner.locationLatitude,
                    gameInstance.owner.locationLongitude,
                  ]}
                >
                  <LocationMarker />
                </Map>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </ScrollArea>
  );
};

export default ReservationDetailsRenter;
