import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { tokenState } from "@/state/token";
import { GameInstanceSearchParams } from "@/types/GameInstance";
import { User } from "@/types/User";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { UserApi } from "@/api/UserApi";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import LoadingMap from "@/components/Map/LoadingMap";
import UserMarker from "@/components/Map/UserMarker";
import UserFilter from "@/components/UserFilter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import GameInstancesSearchResults from "./GamesInstancesSearchResults";
import GamesSearch from "./GamesSearch";

const DEFAULT_SEARCH_PARAMS: GameInstanceSearchParams = {
  searchName: "",
};

const GAMES_PAGE_SIZE = 10;
const USERS_PAGE_SIZE = 10;

const Dashboard: FC = () => {
  const [location, setLocation] = useRecoilState(locationState);
  const [searchParams, setSearchParams] = useState<GameInstanceSearchParams>(DEFAULT_SEARCH_PARAMS);
  const [userParam, setUserParam] = useState<User | null>(null);
  const [hoveredUserUUID, setHoveredUserUUID] = useState("");
  const [latitude, longitude] = location as number[];
  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });
  const { toast } = useToast();
  const { t } = useTranslation();
  const token = useRecoilState(tokenState);

  const {
    data: gameInstances,
    isLoading: isGamesLoading,
    isError: isGamesError,
    hasNextPage: hasGamesNextPage,
    fetchNextPage: fetchGamesNextPage,
    isFetchingNextPage: isFetchingGamesNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-game-instances", { ...searchParams, uuid: userParam?.uuid, token }],
    queryFn: ({ pageParam = 0 }) =>
      GameInstanceApi.search(
        latitude,
        longitude,
        pageParam as number,
        GAMES_PAGE_SIZE,
        searchParams,
        userParam?.uuid,
      ),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
  });

  const {
    data: users,
    isLoading: isUsersLoading,
    fetchNextPage: usersFetchNextPage,
    isFetchingNextPage: isFetchingUsersNextPage,
  } = useInfiniteQuery({
    queryKey: ["user-pins", { ...searchParams, token }],
    queryFn: ({ pageParam = 0 }) =>
      UserApi.search(latitude, longitude, pageParam as number, USERS_PAGE_SIZE, searchParams),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
    onSuccess: data => {
      if (data.pages[0].paginationInfo.totalPages > data.pages.length) {
        usersFetchNextPage();
      }
    },
    onError: () => {
      toast({
        title: t("errorFetchingUsersOnMap"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isGamesLoading) {
      void fetchGamesNextPage();
    }
  }, [entry?.isIntersecting, fetchGamesNextPage, isGamesLoading]);

  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow overflow-hidden rounded-lg bg-section">
        <Map autolocate location={location} setLocation={setLocation}>
          {isUsersLoading || isFetchingUsersNextPage ? <LoadingMap /> : <></>}
          <LocationButton />
          <LocationMarker disabled />
          <>
            {users &&
              users?.pages
                .flatMap(page => page.results)
                .map(user => (
                  <UserMarker
                    user={user}
                    key={user.uuid}
                    onClick={setUserParam}
                    active={user.uuid === hoveredUserUUID}
                  />
                ))}
          </>
        </Map>
      </div>
      <div className="flex w-[700px] flex-col gap-4 rounded-lg bg-section p-4">
        <GamesSearch onSubmit={setSearchParams} />
        {userParam && <UserFilter user={userParam} />}
        <ScrollArea>
          <GameInstancesSearchResults
            gameInstances={
              gameInstances ? gameInstances.pages.flatMap(page => page.results) : undefined
            }
            isLoading={isGamesLoading}
            isFetchingNextPage={isFetchingGamesNextPage}
            isError={isGamesError}
            setActive={setHoveredUserUUID}
          />
          {hasGamesNextPage && <div ref={ref} data-test="scroller-trigger" />}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Dashboard;
