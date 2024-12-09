import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { ReservationQueryParams } from "@/types/Reservation";
import { ReservationsApi } from "@/api/ReservationsApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const RESERVATIONS_PAGE_SIZE = 100;

const ReservationsHistory: FC = () => {
  const [queryParams, setQueryParams] = useState<ReservationQueryParams>({
    asOwner: "all",
    status: undefined,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const token = useRecoilValue(tokenState);

  const { data: ownerReservations, isLoading: isOnwerLoading } = useQuery({
    queryKey: ["owner-reservations", { status: queryParams.status, token, language }],
    queryFn: ({ pageParam = 0 }) =>
      ReservationsApi.getAll(pageParam, RESERVATIONS_PAGE_SIZE, {
        status: queryParams.status,
        asOwner: "owner",
      }),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
    enabled: queryParams.asOwner === "all" || queryParams.asOwner === "owner",
    onError: () => {
      toast({
        title: t("errorFetchingReservations"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      navigate(URLS.DASHBOARD);
    },
  });

  const { data: renterReservations, isLoading } = useQuery({
    queryKey: ["renter-reservations", { status: queryParams.status, token, language }],
    queryFn: ({ pageParam = 0 }) =>
      ReservationsApi.getAll(pageParam, RESERVATIONS_PAGE_SIZE, {
        status: queryParams.status,
        asOwner: "renter",
      }),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
    enabled: queryParams.asOwner === "all" || queryParams.asOwner === "renter",
    onError: () => {
      toast({
        title: t("errorFetchingReservations"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      navigate(URLS.DASHBOARD);
    },
  });

  const combinedReservations =
    queryParams.asOwner === "all"
      ? [...(ownerReservations?.results ?? []), ...(renterReservations?.results ?? [])]
      : queryParams.asOwner === "owner"
        ? ownerReservations?.results ?? []
        : renterReservations?.results ?? [];

  return (
    <div className="flex h-full flex-row gap-6">
      <ReservationsSideBar setQueryParams={setQueryParams} />
      <ScrollArea className="h-full flex-grow rounded-lg bg-section p-4">
        <ReservationsList
          asOwner={queryParams.asOwner}
          reservations={combinedReservations}
          isLoading={
            queryParams.asOwner === "all"
              ? isLoading || isOnwerLoading
              : queryParams.asOwner === "owner"
                ? isOnwerLoading
                : isLoading
          }
          noReservationsMessage={
            queryParams.status ? t("noReservationsStatus") : t("noReservations")
          }
        />
      </ScrollArea>
    </div>
  );
};

export default ReservationsHistory;
