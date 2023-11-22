import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReservationDetails } from "@/types/Reservation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReservationDetailsStatus from "./ReservationDetailsStatus";
import ReservationDetailsTable from "./ReservationDetailsTable";
import { reservation } from "@cypress/fixtures/reservations";

interface ReservationDetailsOwnerProps {
  reservation: ReservationDetails;
}

const ReservationDetailsOwner: FC<ReservationDetailsOwnerProps> = ({
  reservation: {
    reservation: { reservationId, startDate, endDate, duration, renterComment },
  },
}) => {
  const { t } = useTranslation();
  
  return (
    <ScrollArea className="h-full w-full xl:h-max">
      <div className="flex h-full w-full flex-col gap-4 xl:h-[calc(100vh-48px)] xl:flex-row">
        <div className="flex min-h-[100%] flex-grow flex-col gap-4">
          <div className="relative flex-grow rounded-lg bg-section p-8">
            <div
              className="absolute left-4 right-4 top-4 h-1/2 rounded-lg opacity-50 dark:opacity-40"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(133, 43, 130) 100%)`,
              }}
            />
            <div className="relative flex h-full flex-grow flex-col gap-8">
              <h1 className="text-2xl uppercase">{t("reservationHeader", { reservationId })}</h1>
              <ReservationDetailsTable
                reservationId={reservationId}
                startDate={startDate}
                endDate={endDate}
                duration={duration}
              />
              <ReservationDetailsStatus reservationId={reservationId} />
              <div className="flex flex-grow flex-col gap-2">
                <h3 className="text-xl">{t("renterMessage")}</h3>
                <div className="flex-grow rounded-lg bg-card p-4 italic">
                  {renterComment ?? t("renterNoMessage")}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow rounded-lg bg-section p-4">renter opinion about you</div>
          <div className="flex-grow rounded-lg bg-section p-4">renter opinion your game</div>
        </div>
        <div className="flex flex-grow flex-col gap-4">
          <div className="relative flex-grow rounded-lg bg-section p-4">renter details</div>
          <div className="flex-grow rounded-lg bg-section p-4">your opinion about renter</div>
        </div>
        <div className="relative flex flex-grow flex-col gap-4 rounded-lg bg-section p-4 xl:h-full">
          game + game calendar
        </div>
      </div>
    </ScrollArea>
  );
};

export default ReservationDetailsOwner;
