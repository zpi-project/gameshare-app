import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ReservationDetailsTableProps {
  reservationId: string;
  startDate: string;
  endDate: string;
  duration: number;
}

const ReservationDetailsTable: FC<ReservationDetailsTableProps> = ({
  reservationId,
  startDate,
  endDate,
  duration,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-1 text-xl">
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
  );
};

export default ReservationDetailsTable;
