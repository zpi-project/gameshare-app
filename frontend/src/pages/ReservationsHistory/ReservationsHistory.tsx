import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { ReservationQueryParams } from "@/types/Reservation";
import { ReservationsApi } from "@/api/ReservationsApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const ReservationsHistory: FC = () => {
  const [queryParams, setQueryParams] = useState<ReservationQueryParams>({
    asOwner: true,
    status: undefined,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservations", queryParams],
    queryFn: () => ReservationsApi.getAll(0, 10, queryParams),
    onError: () => {
      toast({
        title: t("errorFetchingReservations"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      navigate(URLS.DASHBOARD);
    },
  });

  return (
    <div className="flex h-full flex-row gap-6">
      <ReservationsSideBar setQueryParams={setQueryParams} />
      <ScrollArea className="h-full flex-grow rounded-lg bg-section p-4">
        <ReservationsList
          reservations={reservations?.results}
          isLoading={isLoading}
          noReservationsMessage={
            queryParams.status ? t("noReservationsStatus") : t("noReservations")
          }
        />
      </ScrollArea>
    </div>
  );
};

export default ReservationsHistory;
