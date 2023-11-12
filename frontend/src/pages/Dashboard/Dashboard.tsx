import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { GameInstanceSearchParams } from "@/types/GameInstance";
import { User } from "@/types/User";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import UserMarker from "@/components/Map/UserMarker";
import GameInstancesSearchResults from "../../components/GamesInstancesSearchResults";
import GamesSearch from "./GamesSearch";
import UserFilter from "./UserFilter";

const USERS = [
  {
    uuid: "f389934d-9aa8-4cf1-bcd5-d5d4ebaf82e1",
    firstName: "Maria",
    lastName: "Markowiak",
    locationLatitude: 51.114838379988164,
    locationLongitude: 17.03467499967268,
    avatarLink:
      "https://lh3.googleusercontent.com/a/ACg8ocKSMQ8I_i-Jo5qQoxYDLLnxVatv7_ffeoivIEaxodZFqQ=s96-c",
    avgRating: 4,
    phoneNumber: "+48581888888",
  },
  {
    uuid: "3d5d2dea-addf-4a08-8b25-9637d70736e2",
    firstName: "Ewa",
    lastName: "Bożena",
    locationLatitude: 51.10784676531416,
    locationLongitude: 17.06464290618897,
    avatarLink:
      "https://lh3.googleusercontent.com/a/ACg8ocLq6wb1HLN-F_ZElSca-Y7H3vPv0oHPbAG9S5DAcwFO=s96-c",
    avgRating: 3.4,
    phoneNumber: "+48415343243",
  },
  {
    uuid: "2ec80c6c-2531-473b-a16a-0cc8f42c9450",
    firstName: "Joanna",
    lastName: "Kotek",
    locationLatitude: 51.11474408779064,
    locationLongitude: 17.06807613372803,
    avatarLink:
      "https://lh3.googleusercontent.com/a/ACg8ocKHmJl7NEQj-dMuBYDhAoaV7fKWUcYjVHsiH1nSnEQGuxo=s96-c",
    avgRating: 0,
  },
];

const DEFAULT_SEARCH_PARAMS: GameInstanceSearchParams = {
  searchName: "",
};

//TODO: fetch users when endpoint added,
// load games on scroll
// load more users on interval
// filter games by user when endpoint fixed
// remove users above

const Dashboard: FC = () => {
  const [location, setLocation] = useRecoilState(locationState);
  const [searchParams, setSearchParams] = useState<GameInstanceSearchParams>(DEFAULT_SEARCH_PARAMS);
  const [userParam, setUserParam] = useState<User | null>(null);
  const [hoveredUserUUID, setHoveredUserUUID] = useState("");
  const [latitude, longitude] = location as number[];

  console.log(hoveredUserUUID);
  const {
    data: gameInstances,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["game-instances", searchParams],
    queryFn: () => GameInstanceApi.search(latitude, longitude, 0, 15, searchParams),
  });

  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow overflow-hidden rounded-lg bg-section">
        <Map autolocate location={location} setLocation={setLocation}>
          <LocationButton />
          <LocationMarker />
          <>
            {USERS.map(user => (
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
        <GameInstancesSearchResults
          gameInstances={gameInstances}
          isLoading={isLoading}
          isError={isError}
          setActive={setHoveredUserUUID}
        />
      </div>
    </div>
  );
};

export default Dashboard;
