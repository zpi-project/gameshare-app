import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { GameApi } from "@/api/GameApi";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameInstancesList from "./GameInstancesList";

const GAMES_PAGE_SIZE = 10;

const GameUsersSection: FC = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const [location, setLocation] = useRecoilState(locationState);
  const [latitude, longitude] = location as number[];
  const [hoveredUserUUID, setHoveredUserUUID] = useState("");
  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });

  const {
    data: gameInstances,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["game-game-instances", { id }],
    queryFn: ({ pageParam = 0 }) =>
      GameApi.getInstances(parseInt(id), pageParam as number, GAMES_PAGE_SIZE, latitude, longitude),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, isLoading]);

  return (
    <>
      <div className="w-3/5 overflow-hidden rounded-lg">
        <Map autolocate location={location} setLocation={setLocation}>
          <LocationButton />
          <LocationMarker />
        </Map>
      </div>
      <div className="h-[calc(100%-32px)] w-2/5">
        <h3 className="mb-1 text-xl font-bold text-primary">{t("gameInstances")}</h3>
        <ScrollArea className="h-full">
          <GameInstancesList
            gameInstances={
              gameInstances ? gameInstances.pages.flatMap(page => page.results) : undefined
            }
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            isError={isError}
            setActive={setHoveredUserUUID}
          />
          {hasNextPage && <div ref={ref} data-test="scroller-trigger" />}
        </ScrollArea>
      </div>
    </>
  );
};

export default GameUsersSection;
