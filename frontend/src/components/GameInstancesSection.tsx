import { FC } from "react";
import { useTranslation } from "react-i18next";
import { gameInstances } from "@cypress/fixtures/gameInstances";
import { User } from "@/types/User";
import { getName } from "@/utils/user";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import GameInstance from "./GameInstance";
import { Search } from 'lucide-react';
import { Button } from "./ui/button";

interface Props {
  owner?: User;
  isLoading: boolean;
}

const GameInstancesSection: FC<Props> = ({ owner, isLoading }) => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col gap-6">
      {isLoading && (
        <>
          <div className="flex flex-col">
            <Skeleton className="h-max-h flex-grow rounded-lg p-5" />
          </div>
        </>
      )}
      {owner && (
        <>
          <div className="flex h-full flex-col gap-2">
            <div className="h-max-h flex-grow place-items-center rounded-lg bg-card p-5 text-xl">
              {t("userGames")} {getName(owner)}
            </div>
            <div className="flex flex-row gap-2">
              <Input
                className="h-max-h flex-grow rounded-lg bg-card p-5"
                placeholder="Type to search..."
              />
              <Button>
                <Search />
              </Button>
            </div>
            <ScrollArea>
              <div className="flex flex-col gap-4 p-4">
                {gameInstances.map((gameInstance, id) => (
                  <GameInstance gameInstance={gameInstance} key={id} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInstancesSection;
