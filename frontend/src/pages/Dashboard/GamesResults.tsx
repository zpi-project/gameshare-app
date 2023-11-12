import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SearchGameInstance } from "@/types/GameInstance";
import { Paginated } from "@/types/Paginated";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import GameResult from "./GameResult";

const game = {
  uuid: "de80b909-055f-4a6e-a503-e578142330b2",
  description: "nowiuśka gierka",
  pricePerDay: 20,
  game: {
    id: 1,
    name: "Brass: Birmingham",
    image:
      "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__original/img/FpyxH41Y6_ROoePAilPNEhXnzO8=/0x0/filters:format(jpeg)/pic3490053.jpg",
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 120,
    age: 14,
    shortDescription:
      "Brass: Birmingham is an economic strategy game set during the industrial revolution in Birmingham. Players compete as entrepreneurs, developing industries, building networks, and exploiting market demands. The game introduces new actions and industry types, such as breweries and pottery, and features a dynamic scoring system. Players must strategically manage resources, sell goods, and score the most victory points to win.",
    categories: [
      {
        id: 1,
        name: "Economic",
      },
      {
        id: 2,
        name: "Industry / Manufacturing",
      },
      {
        id: 3,
        name: "Post-Napoleonic",
      },
      {
        id: 4,
        name: "Trains",
      },
      {
        id: 5,
        name: "Transportation",
      },
    ],
  },
  owner: {
    uuid: "f389934d-9aa8-4cf1-bcd5-d5d4ebaf82e1",
    firstName: "Maria",
    lastName: "Markowiak",
    locationLatitude: 51.114838379988164,
    locationLongitude: 17.03467499967268,
    avatarLink:
      "https://lh3.googleusercontent.com/a/ACg8ocKSMQ8I_i-Jo5qQoxYDLLnxVatv7_ffeoivIEaxodZFqQ=s96-c",
    avgRating: 3,
  },
  avgRating: 4,
  active: true,
};

interface GamesResultsProps {
  gameInstances: Paginated<SearchGameInstance> | undefined;
  isLoading: boolean;
  isError: boolean;
}

const GamesResults: FC<GamesResultsProps> = ({ gameInstances, isLoading, isError }) => {
  const { t } = useTranslation();

  return (
    <ScrollArea>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, id) => (
              <Skeleton className="h-[152px] rounded-lg" key={id} />
            ))}
          </>
        ) : isError ? (
          <h3 className="mt-2 text-center text-xl text-destructive">{t("errorFetchingGames")}</h3>
        ) : (
          <>
            {gameInstances &&
              gameInstances.results.map(gameInstance => (
                <GameResult gameInstance={game} key={gameInstance.uuid} />
              ))}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default GamesResults;
