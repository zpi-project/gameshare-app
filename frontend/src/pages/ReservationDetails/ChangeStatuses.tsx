import { FC, useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { RESERVATION_STATUS_COLORS } from "@/constants/reservationStatuses";
import { ReservationStatusType } from "@/types/Reservation";
import { ReservationsApi } from "@/api/ReservationsApi";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface ChangeStatusesProps {
  reservationId: string;
  status: ReservationStatusType;
  user: "owner" | "renter";
}

const ChangeStatuses: FC<ChangeStatusesProps> = ({ reservationId, status, user }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedStatus, setSelectedStatus] = useState<ReservationStatusType | undefined>(
    undefined,
  );

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
        queryClient.invalidateQueries(["reservation-statuses", { reservationId, status }]);
        setSelectedStatus(undefined);
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

  return (
    <div>
      {isLoading && <Spinner />}
      <div className="flex justify-end gap-4">
        {statuses &&
          statuses.length > 0 &&
          statuses.map(status => (
            <Button
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className={`${RESERVATION_STATUS_COLORS[status.value]}`}
            >
              {t(`changeStatusAction.${status.value}`)}
            </Button>
          ))}
      </div>
      <Dialog open={Boolean(selectedStatus)}>
        <DialogContent>
          <DialogTitle>
            {t("areYouSureToChangeStatus", {
              status: t(`reservationStatuses.${user}.${selectedStatus}`),
            })}
          </DialogTitle>
          <DialogFooter>
            <Button variant="outline-secondary" onClick={() => setSelectedStatus(undefined)}>
              {t("cancel")}
            </Button>
            <Button variant="secondary" onClick={() => mutate(selectedStatus as string)}>
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeStatuses;
