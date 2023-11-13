import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SearchGameInstance } from "@/types/GameInstance";
import { Skeleton } from "@/components/ui/skeleton";
import GameResult from "./GameResult";

interface GamesResultsProps {
  gameInstances: SearchGameInstance[] | undefined;
  isLoading: boolean;
  isError: boolean;
  setActive: (uuid: string) => void;
  isFetchingNextPage: boolean;
}

const GamesResults: FC<GamesResultsProps> = ({
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
          {gameInstances &&
            gameInstances.map(gameInstance => (
              <GameResult
                gameInstance={gameInstance}
                key={gameInstance.uuid}
                setActive={setActive}
              />
            ))}
        </>
      )}
      {isFetchingNextPage && <Skeleton className="h-[152px] rounded-lg" />}
    </div>
  );
};

export default GamesResults;
