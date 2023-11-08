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
  isMyPage: boolean;
}

const GameInstancesSection: FC<Props> = ({ owner, isLoading, showButtons, isMyPage }) => {
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
          <div className="flex h-full w-full flex-col gap-4">
            <div className="h-max w-full flex-grow rounded-lg bg-card p-5 text-2xl">
              {isMyPage ? t("myGames") : `${t("userGames")} ${getName(owner)}`}
            </div>
            <div className="flex flex-row gap-2">
              <div className="relative flex-grow">
                <Input
                  className="flex-grow rounded-lg border-none bg-card"
                  placeholder="Type to search..."
                  onChange={event => setQuery(event.target.value)}
                />
                <Search className="absolute right-4 top-2" />
              </div>
              {showButtons && <Button className="w-56">{t("addGameInstance")}</Button>}
            </div>
            <ScrollArea className="h-[calc(100%-100px)]">
              <div className="flex h-full flex-col gap-4">
                {gameInstances
                  .filter(post => {
                    if (query === "") {
                      return post;
                    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
                      return post;
                    }
                  })
                  .map((gameInstance, id) => (
                    <GameInstance gameInstance={gameInstance} key={id} showButtons={showButtons} />
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
