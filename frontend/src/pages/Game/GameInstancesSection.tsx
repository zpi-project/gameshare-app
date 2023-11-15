import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { User } from "@/types/User";
import { GameApi } from "@/api/GameApi";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import LoadingMap from "@/components/Map/LoadingMap";
import UserMarker from "@/components/Map/UserMarker";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameInstancesList from "./GameInstancesList";

const GAMES_PAGE_SIZE = 15;

const GameUsersSection: FC = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const [location, setLocation] = useRecoilState(locationState);
  const [latitude, longitude] = location as number[];
  const [hoveredUserUUID, setHoveredUserUUID] = useState("");
  const [clickedUser, setClickedUser] = useState<User | null>(null);
  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["game-game-instances", { id }],
      queryFn: ({ pageParam = 0 }) =>
        GameApi.getInstances(
          parseInt(id),
          pageParam as number,
          GAMES_PAGE_SIZE,
          latitude,
          longitude,
        ),
      getNextPageParam: (_, pages) => {
        const newPageParam = pages.length;
        return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
      },
    });

  const gameInstances = useMemo(() => data?.pages.flatMap(page => page.results) ?? [], [data]);

  const users = useMemo(() => {
    const uniqueUsers = Array.from(
      new Set(gameInstances.map(gameInstance => gameInstance.owner.uuid)),
    ).map(uuid => gameInstances.find(gameInstance => gameInstance.owner?.uuid === uuid)!.owner!);

    return uniqueUsers ?? [];
  }, [gameInstances]);

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, isLoading]);

  return (
    <>
      {isError ? (
        <h3 className="absolute bottom-[100px] mt-2 w-[calc(100%-150px)] text-center text-xl text-destructive">
          {t("errorFetchingGameInstances")}
        </h3>
      ) : gameInstances.length > 0 ? (
        <div className="flex h-[calc(100%-400px)] flex-row gap-4 rounded-lg bg-section p-4">
          <div className="w-3/5 overflow-hidden rounded-lg">
            <Map autolocate location={location} setLocation={setLocation}>
              {isLoading ? <LoadingMap /> : <></>}
              <LocationButton />
              <LocationMarker disabled />
              <>
                {users.map(user => (
                  <UserMarker
                    user={user}
                    key={user.uuid}
                    onClick={setClickedUser}
                    active={user.uuid === hoveredUserUUID}
                  />
                ))}
              </>
            </Map>
          </div>
          <div className="h-[calc(100%-40px)] w-2/5">
            <h3 className="mb-3 text-xl font-bold text-primary">{t("gameInstances")}</h3>
            <ScrollArea className="h-full">
              <GameInstancesList
                gameInstances={gameInstances}
                userFilter={clickedUser}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
                setActive={setHoveredUserUUID}
              />
              {hasNextPage && <div ref={ref} data-test="scroller-trigger" />}
            </ScrollArea>
          </div>
        </div>
      ) : (
        !isLoading && (
          <h3 className="absolute bottom-[100px] mt-2  w-[calc(100%-150px)] text-center text-xl">
            {t("noGameUsers")}
          </h3>
        )
      )}
    </>
  );
};

export default GameUsersSection;
