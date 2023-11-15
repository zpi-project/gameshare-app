import { FC } from "react";
import { GameInstanceDetails } from "@/types/GameInstance";
import { User } from "@/types/User";
import UserFilter from "@/components/UserFilter";
import { Skeleton } from "@/components/ui/skeleton";
import GameInstanceCard from "./GameInstanceCard";

interface GameInstancesListProps {
  gameInstances: GameInstanceDetails[];
  isLoading: boolean;
  isError: boolean;
  setActive: (uuid: string) => void;
  isFetchingNextPage: boolean;
  userFilter: User | null;
}

const GameInstancesList: FC<GameInstancesListProps> = ({
  gameInstances,
  isLoading,
  isFetchingNextPage,
  setActive,
  userFilter,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {userFilter && <UserFilter user={userFilter} />}
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, id) => (
            <Skeleton className="h-[152px] rounded-lg" key={id} />
          ))}
        </>
      ) : (
        <>
          {(userFilter
            ? gameInstances.filter(gameInstance => gameInstance.owner.uuid === userFilter.uuid)
            : gameInstances
          ).map(gameInstance => (
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
