import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReservationDetails } from "@/types/Reservation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReservationDetailsSection from "./ReservationDetailsSection";

interface ReservationDetailsOwnerProps {
  reservation: ReservationDetails;
}

const ReservationDetailsOwner: FC<ReservationDetailsOwnerProps> = ({
  reservation: { reservation },
}) => {
  const { t } = useTranslation();

  return (
    <ScrollArea className="h-full w-full xl:h-max">
      <div className="flex h-full w-full flex-col gap-4 xl:h-[calc(100vh-48px)] xl:flex-row">
        <div className="flex min-h-[100%] flex-grow flex-col gap-4">
          <ReservationDetailsSection reservation={reservation} />
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
