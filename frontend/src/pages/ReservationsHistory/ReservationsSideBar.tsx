import { FC } from "react";
import { useTranslation } from "react-i18next";

const ReservationsSideBar: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="h-full rounded-lg bg-section p-4">
      <div className="h-full rounded-lg bg-card p-4">
              <h2 className="text-xl uppercase">{t("myReservations")}</h2>
              
      </div>
    </div>
  );
};

export default ReservationsSideBar;
