import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RESERVATION_STATUS_COLORS } from "@/constants/reservationStatuses";
import { ReservationStatusType } from "@/types/Reservation";
import { cn } from "@/utils/tailwind";
import { Badge } from "@/components/ui/badge";

interface ReservationDetailsStatusProps {
  reservationId: string;
  status: ReservationStatusType;
  user: "owner" | "renter";
}

const ReservationDetailsStatus: FC<ReservationDetailsStatusProps> = ({
  status,
  user,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row justify-between">
      <div className="flex justify-center gap-1">
        <Badge
          className={cn(
            RESERVATION_STATUS_COLORS[status],
            "border border-foreground/20 text-base tracking-wide shadow-md",
          )}
        >
          {t(`reservationStatuses.${user}.${status}`)}
        </Badge>
      </div>
    </div>
  );
};

export default ReservationDetailsStatus;
