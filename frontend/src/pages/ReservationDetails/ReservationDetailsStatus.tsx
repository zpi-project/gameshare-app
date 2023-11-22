import { FC } from "react";
import { useTranslation } from "react-i18next";
import SelectInput from "@/components/SelectInput";
import { ReservationStatusType } from "@/types/Reservation";

interface ReservationDetailsStatusProps {
  reservationId: string;
  status: ReservationStatusType
}

const ReservationDetailsStatus: FC<ReservationDetailsStatusProps> = ({ reservationId, status }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between">
      <h4 className="text-xl">{t("status")}</h4>
      <SelectInput options={[]} placeholder="dsds" onChange={() => null} noResultsInfo="" />
    </div>
  );
};

export default ReservationDetailsStatus;
