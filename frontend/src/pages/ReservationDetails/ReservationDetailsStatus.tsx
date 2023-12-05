import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RESERVATION_STATUSES } from "@/constants/reservationStatuses";
import { ReservationStatusType } from "@/types/Reservation";
import { ReservationsApi } from "@/api/ReservationsApi";
import SelectInput from "@/components/SelectInput";
import Spinner from "@/components/ui/Spinner";
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
      <h4 className="text-xl">{t("status")}</h4>
      {isLoading && <Spinner />}
      <SelectInput
        width="w-[250px]"
        options={statuses ?? []}
        placeholder={t(`reservationStatuses.${user}.${status}`)}
        onChange={onStatusChange}
        noResultsInfo=""
        clearValueOnChange
        disabled={!statuses || statuses.length === 0}
      />
    </div>
  );
};

export default ReservationDetailsStatus;
