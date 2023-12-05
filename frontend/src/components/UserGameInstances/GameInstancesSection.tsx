import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { User } from "@/types/User";
import { getName } from "@/utils/user";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";
import GameInstance from "./GameInstance";
import GameInstanceForm from "./GameInstanceAddForm";

interface Props {
  owner?: User;
  isMyPage?: boolean;
}

const GameInstancesSection: FC<Props> = ({ owner, isMyPage }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    data: gameInstances,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-game-instances", { uuid: owner?.uuid, language }],
    queryFn: () =>
      isMyPage
        ? GameInstanceApi.getAll(0, 100)
        : GameInstanceApi.getAllByUUID(owner?.uuid ?? "", 0, 100),
    enabled: owner !== undefined,
  });
  const queryClient = useQueryClient();

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {owner && (
        <>
          <div className="flex h-full w-full flex-col gap-4">
            <div className="h-max w-full flex-grow rounded-lg bg-card p-2 xl:p-5 xl:text-2xl">
              {isMyPage ? t("myGames") : `${t("userGames")} ${getName(owner)}`}
            </div>
            <div className="flex flex-row gap-2">
              <div className="relative flex-grow">
                <Input
                  className="flex-grow rounded-lg border-none bg-card"
                  placeholder={t("typeToSearch")}
                  onChange={event => setQuery(event.target.value)}
                />
                <Search className="absolute right-4 top-2" />
              </div>
              {isMyPage && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-56">{t("addGameInstance")}</Button>
                  </DialogTrigger>
                  <GameInstanceForm
                    onSubmit={() => {
                      queryClient.invalidateQueries(["user-game-instances", { uuid: owner?.uuid }]);
                      setDialogOpen(false);
                    }}
                  />
                </Dialog>
              )}
            </div>
            <ScrollArea className="h-[calc(100%-100px)] w-full flex-grow">
              {isLoading ? (
                <div className="flex flex-col gap-4 pr-4">
                  {Array.from({ length: 4 }).map((_, id) => (
                    <Skeleton className="h-[152px] rounded-lg" key={id} />
                  ))}
                </div>
              ) : isError ? (
                <h3 className="mt-2 text-center text-xl text-destructive">
                  {t("errorFetchingGames")}
                </h3>
              ) : (
                <div className="flex h-full w-full flex-col gap-4 pr-4">
                  {gameInstances.results.length ? (
                    gameInstances.results
                      .filter(post => {
                        if (query === "") {
                          return post;
                        } else if (post.game.name.toLowerCase().includes(query.toLowerCase())) {
                          return post;
                        }
                      })
                      .map((gameInstance, id) => (
                        <GameInstance gameInstance={gameInstance} key={id} showButtons={isMyPage} />
                      ))
                  ) : (
                    <h4 className="mt-4 text-center text-xl">
                      {t(isMyPage ? "noGamesMyPage" : "noGamesUserPage")}
                    </h4>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInstancesSection;
