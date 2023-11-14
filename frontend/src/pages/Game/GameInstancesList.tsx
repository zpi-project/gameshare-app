import { FC } from "react";
import { GameInstanceDetails } from "@/types/GameInstance";
import { Skeleton } from "@/components/ui/skeleton";
import GameInstanceCard from "./GameInstanceCard";

interface GameInstancesListProps {
  gameInstances: GameInstanceDetails[] | undefined;
  isLoading: boolean;
  setActive: (uuid: string) => void;
  isFetchingNextPage: boolean;
}

const GameInstancesList: FC<GameInstancesListProps> = ({
  gameInstances,
  isLoading,
  isFetchingNextPage,
  setActive,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, id) => (
            <Skeleton className="h-[152px] rounded-lg" key={id} />
          ))}
        </>
      ) : (
        <>
          {gameInstances &&
            gameInstances.map(gameInstance => (
              <GameInstanceCard
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

export default GameInstancesList;
