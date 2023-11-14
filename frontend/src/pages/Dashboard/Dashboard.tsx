import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { GameInstanceSearchParams } from "@/types/GameInstance";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import GamesResults from "./GamesResults";
import GamesSearch from "./GamesSearch";

const DEFAULT_SEARCH_PARAMS: GameInstanceSearchParams = {
  searchName: "",
};

const Dashboard: FC = () => {
  const [location, setLocation] = useRecoilState(locationState);
  const [searchParams, setSearchParams] = useState<GameInstanceSearchParams>(DEFAULT_SEARCH_PARAMS);
  console.log(location);
  const [latitude, longitude] = location as number[];

  const {
    data: gameInstances,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["game-instances", searchParams],
    queryFn: () => GameInstanceApi.search(latitude, longitude, 0, 15, searchParams),
  });

  console.log(gameInstances);

  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow overflow-hidden rounded-lg bg-section">
        <Map autolocate location={location} setLocation={setLocation}>
          <LocationButton />
          <LocationMarker />
        </Map>
      </div>
      <div className="flex w-[700px] flex-col gap-4 rounded-lg bg-section p-4">
        <GamesSearch onSubmit={setSearchParams} />
        {/* <GamesResults gameInstances={gameInstances} isLoading={isLoading} isError={isError} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
