import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { gameInstances } from "@cypress/fixtures/gameInstances";
import { Search } from "lucide-react";
import { User } from "@/types/User";
import { getName } from "@/utils/user";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import GameInstance from "./GameInstance";
import { Button } from "./ui/button";

interface Props {
  owner?: User;
  isLoading: boolean;
  showButtons: boolean;
}

const GameInstancesSection: FC<Props> = ({ owner, isLoading, showButtons }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {isLoading && (
        <>
          <div className="flex flex-col">
            <Skeleton className="h-max-h flex-grow rounded-lg p-5" />
          </div>
        </>
      )}
      {owner && (
        <>
          <div className="flex h-full w-full flex-col gap-2">
            <div className="h-max w-full flex-grow rounded-lg bg-card p-5 text-2xl">
              {t("userGames")} {getName(owner)}
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex h-max w-max flex-grow flex-row items-center gap-3 rounded-lg bg-card p-2">
                <Input
                  className="flex-grow rounded-lg bg-card"
                  placeholder="Type to search..."
                  onChange={event => setQuery(event.target.value)}
                />
                <Search className="" />
              </div>
              {showButtons && <Button className="w-56">{t("addGameInstance")}</Button>}
            </div>
            <div className="flex h-full">
              <ScrollArea>
                <div className="flex flex-col gap-4 p-4">
                  {gameInstances
                    .filter(post => {
                      if (query === "") {
                        return post;
                      } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
                        return post;
                      }
                    })
                    .map((gameInstance, id) => (
                      <GameInstance gameInstance={gameInstance} key={id} />
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInstancesSection;
