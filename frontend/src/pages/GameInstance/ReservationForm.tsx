import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GameInstanceDetails } from "@/types/GameInstance";

interface ReservationFormProps {
  gameInstance: GameInstanceDetails;
}

const ReservationForm: FC<ReservationFormProps> = ({ gameInstance }) => {
  const { t } = useTranslation();

  return (
    <div className="w-[364px] min-w-[364px] flex-grow">
      <h2 className="text-2xl uppercase text-secondary">{t("reservationForm")}</h2>
    </div>
  );
};

export default ReservationForm;
