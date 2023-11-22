import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Reservation } from "@/types/Reservation";
import ReservationDetailsStatus from "./ReservationDetailsStatus";
import ReservationDetailsTable from "./ReservationDetailsTable";

interface ReservationDetailsSectionProps {
  reservation: Reservation;
}

const ReservationDetailsSection: FC<ReservationDetailsSectionProps> = ({
  reservation: { reservationId, startDate, endDate, duration },
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex-grow rounded-lg bg-section p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl uppercase">{t("reservationHeader", { reservationId })}</h1>
        <ReservationDetailsTable
          reservationId={reservationId}
          startDate={startDate}
          endDate={endDate}
          duration={duration}
        />
        <ReservationDetailsStatus reservationId={reservationId} />
      </div>
    </div>
  );
};

export default ReservationDetailsSection;
