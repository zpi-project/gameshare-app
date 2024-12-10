import { FC, useState } from "react";
import { Button } from "react-day-picker";
import { user } from "@cypress/fixtures/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { ReservationStatusType } from "@/types/Reservation";
import { ReservationsApi } from "@/api/ReservationsApi";
import Spinner from "@/components/ui/Spinner";
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
      {statuses &&
        statuses.length > 0 &&
        statuses.map(status => (
          <Button key={status.value} onClick={() => setSelectedStatus(status.value)}>
            {status.label}
          </Button>
        ))}
    </div>
  );
};

export default ChangeStatuses;
