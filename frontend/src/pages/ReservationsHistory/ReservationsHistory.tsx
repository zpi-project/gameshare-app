import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { ReservationQueryParams } from "@/types/Reservation";
import { ReservationsApi } from "@/api/ReservationsApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import ReservationsList from "./ReservationsList";
import ReservationsSideBar from "./ReservationsSideBar";

const RESERVATIONS_PAGE_SIZE = 10;

const ReservationsHistory: FC = () => {
  const [queryParams, setQueryParams] = useState<ReservationQueryParams>({
    asOwner: true,
    status: undefined,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });
  const token = useRecoilValue(tokenState);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["reservations", { queryParams, token, language }],
    queryFn: ({ pageParam = 0 }) =>
      ReservationsApi.getAll(pageParam, RESERVATIONS_PAGE_SIZE, queryParams),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
    onError: () => {
      toast({
        title: t("errorFetchingReservations"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      navigate(URLS.DASHBOARD);
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, isLoading]);

  return (
    <div className="flex h-full flex-row gap-6">
      <ReservationsSideBar setQueryParams={setQueryParams} />
      <ScrollArea className="h-full flex-grow rounded-lg bg-section p-4">
        <ReservationsList
          asOwner={queryParams.asOwner}
          reservations={data?.pages.flatMap(page => page.results) ?? []}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          noReservationsMessage={
            queryParams.status ? t("noReservationsStatus") : t("noReservations")
          }
        />
        {hasNextPage && <div ref={ref} data-test="scroller-trigger" />}
      </ScrollArea>
    </div>
  );
};

export default ReservationsHistory;
