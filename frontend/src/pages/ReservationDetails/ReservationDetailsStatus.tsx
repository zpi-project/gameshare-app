import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { RESERVATION_STATUS_COLORS, RESERVATION_STATUSES } from "@/constants/reservationStatuses";
import { ReservationStatusType } from "@/types/Reservation";
import { cn } from "@/utils/tailwind";
import { ReservationsApi } from "@/api/ReservationsApi";
import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface ReservationDetailsStatusProps {
  reservationId: string;
  status: ReservationStatusType;
  user: "owner" | "renter";
}

const ReservationDetailsStatus: FC<ReservationDetailsStatusProps> = ({
  reservationId,
  status,
  user,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatusType | undefined>(
    undefined,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedStatus(undefined);
    }
  }, [open]);
  const { data: statuses } = useQuery({
    queryKey: ["reservation-statuses", { reservationId, status }],
    queryFn: () => ReservationsApi.getStatuses(reservationId),
    select: data =>
      data.length
        ? data.map(status => ({ label: t(`reservationStatuses.${user}.${status}`), value: status }))
        : [],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (status: ReservationStatusType) =>
      ReservationsApi.changeStatus(reservationId, status),
    onSuccess: data => {
      queryClient.invalidateQueries(["reservation", { id: reservationId }]);
      toast({
        title: t("successChangingStatus"),
        description: t("successChangingStatusDescription", {
          status: t(`reservationStatuses.${user}.${data.status}`),
          user: t(user === "owner" ? "renter" : "owner"),
        }),
      });
      if (user === "owner") {
        queryClient.invalidateQueries(["reservations-calendar"]);
      }
    },
    onError: () => {
      toast({
        title: t("errorChangingStatus"),
        description: t("errorChangingStatusDescription"),
        variant: "destructive",
      });
    },
  });

  const onStatusChange = (value?: string | number) => {
    if (typeof value === "string" && RESERVATION_STATUSES.includes(value.toUpperCase())) {
      mutate(value.toUpperCase());
    }
  };

  return (
    <div className="flex flex-row justify-between">
      {isLoading && <Spinner />}
      <div className="flex justify-center gap-1">
        <Badge
          className={cn(
            RESERVATION_STATUS_COLORS[status],
            "border border-foreground/20 text-base tracking-wide shadow-md",
          )}
        >
          {t(`reservationStatuses.${user}.${status}`)}
        </Badge>
        {statuses && statuses?.length > 0 && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className={"rounded-[12px]"} size="icon" variant="ghost">
                <Pen />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>{t("changeReservationStatus")}</DialogTitle>
              <div className="flex flex-col gap-2">
                {statuses.map(({ label, value }) => (
                  <Button
                    key={value}
                    onClick={() =>
                      selectedStatus === value
                        ? setSelectedStatus(undefined)
                        : setSelectedStatus(value)
                    }
                    className={cn(
                      "w-max text-left",
                      RESERVATION_STATUS_COLORS[value],
                      "hover:bg-secondary",
                      selectedStatus === value && "outline",
                    )}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <DialogFooter>
                <Button
                  className="outline-secondary"
                  onClick={() => setOpen(false)}
                  variant="outline-secondary"
                >
                  {t("cancel")}
                </Button>
                <Button
                  disabled={Boolean(!selectedStatus)}
                  onClick={() => {
                    onStatusChange(selectedStatus);
                    setOpen(false);
                  }}
                  variant="secondary"
                >
                  {t("save")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ReservationDetailsStatus;
