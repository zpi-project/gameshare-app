import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESERVATION_STATUSES } from "@/constants/reservationStatuses";
import { ReservationStatusType } from "@/types/Reservation";
import { Button } from "@/components/ui/button";

const RESERVATION_TYPES = ["owner", "renter"];

const ReservationsSideBar: FC = () => {
  const { t } = useTranslation();
  const [reservationType, setResevationType] =
    useState<(typeof RESERVATION_TYPES)[number]>("owner");
  const [reservationStatus, setResevationStatus] = useState<ReservationStatusType | "all">("all");

  return (
    <div className="h-full rounded-lg bg-section p-4">
      <div className="flex h-full min-w-[280px] flex-col gap-8 rounded-lg bg-card p-4">
        <h2 className="text-xl uppercase">{t("myReservations")}</h2>
        <section className="flex flex-col gap-4">
          <h3 className="text-lg uppercase">{t("reservationType")}</h3>
          <div className="flex flex-col gap-2">
            {RESERVATION_TYPES.map(type => (
              <Button
                variant={type === reservationType ? "default" : "outline"}
                className="w-max text-left uppercase"
                onClick={() => setResevationType(type)}
                key={type}
              >
                {t(`reservationTypes.${type}`)}
              </Button>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-lg uppercase">{t("reservationStatus")}</h3>
          <div className="flex flex-col gap-2">
            {["all", ...RESERVATION_STATUSES].map(status => (
              <Button
                variant={status === reservationStatus ? "secondary" : "outline-secondary"}
                className="h-max w-max text-left uppercase"
                onClick={() => setResevationStatus(status)}
                key={status}
              >
                {t(`reservationStatuses.${reservationType}.${status}`)}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReservationsSideBar;
