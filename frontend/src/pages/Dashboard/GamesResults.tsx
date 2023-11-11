import { FC } from "react";
import { SearchUserGameInstances } from "@/types/GameInstance";
import { Paginated } from "@/types/Paginated";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameResult from "./GameResult";

interface GamesResultsProps {
  gameInstances: Paginated<SearchUserGameInstances> | undefined;
  isLoading: boolean;
  isError: boolean;
}

const GamesResults: FC<GamesResultsProps> = ({ gameInstances, isLoading, isError }) => {
  return (
    <ScrollArea>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <>is loading</>
        ) : isError ? (
          <>is error</>
        ) : (
          <>
            {gameInstances &&
              gameInstances.results.map(({ gameInstances }) =>
                gameInstances.map(gameInstance => (
                  <GameResult gameInstance={gameInstance} key={gameInstance.uuid} />
                )),
              )}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default GamesResults;
