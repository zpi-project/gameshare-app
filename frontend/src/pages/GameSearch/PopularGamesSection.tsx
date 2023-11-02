import { FC } from "react";
import { useTranslation } from "react-i18next";
import "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import { GameApi } from "@/api/GameApi";
import GameImgTitleCard from "@/components/GameImgTitleCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const POPULAR_GAMES_PAGE_SIZE = 10;

const PopularGamesSection: FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
    data: games,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular-games"],
    queryFn: () => GameApi.getPopular(0, POPULAR_GAMES_PAGE_SIZE),
    onError: () => {
      toast({
        title: t("popularGamesErrorTitle"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-3xl leading-loose text-primary">{t("popularNow")}</h2>
      <ScrollArea className="min-h-[246px] w-full">
        <div className="flex w-full flex-row gap-4">
          {games ? (
            <>
              {games.results.map(game => (
                <GameImgTitleCard game={game} key={game.id} />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2"/>
      </ScrollArea>
    </div>
  );
};

export default PopularGamesSection;
