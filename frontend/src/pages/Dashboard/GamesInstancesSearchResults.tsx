import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SearchGameInstance } from "@/types/GameInstance";
import { Skeleton } from "@/components/ui/skeleton";
import GameInstanceSearchCard from "./GameInstanceSearchCard";

interface GamesResultsProps {
  gameInstances: SearchGameInstance[] | undefined;
  isLoading: boolean;
  isError: boolean;
  setActive: (uuid: string) => void;
  isFetchingNextPage: boolean;
}

const GameInstancesSearchResults: FC<GamesResultsProps> = ({
  gameInstances,
  isLoading,
  isFetchingNextPage,
  isError,
  setActive,
}) => {
  const { t } = useTranslation();

  return (
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
          {gameInstances && gameInstances.length ? (
            gameInstances.map(gameInstance => (
              <GameInstanceSearchCard
                gameInstance={gameInstance}
                key={gameInstance.uuid}
                setActive={setActive}
              />
            ))
          ) : (
            <h4 className="mt-2 text-center text-xl">{t("noGameInstances")}</h4>
          )}
        </>
      )}
      {isFetchingNextPage && <Skeleton className="h-[152px] rounded-lg" />}
    </div>
  );
};

export default GameInstancesSearchResults;
