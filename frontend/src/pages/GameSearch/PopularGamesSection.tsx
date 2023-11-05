import { FC } from "react";
import { useTranslation } from "react-i18next";
import "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import { GameApi } from "@/api/GameApi";
import GameImgTitleCard from "@/components/GameImgTitleCard";
import GameSearchCard from "@/components/GameSearchCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const POPULAR_GAMES_PAGE_SIZE = 8;

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
      <div className="flex w-full flex-row flex-wrap gap-6">
        {isLoading ? (
          Array.from({ length: POPULAR_GAMES_PAGE_SIZE }).map((_, idx) => (
            <Skeleton className="min-h-[232px] w-48 rounded-lg" key={idx} />
          ))
        ) : isError ? (
          <h3 className="text-xl text-destructive">{t("popularGamesErrorTitle")}</h3>
        ) : (
          <>
            {games.results.map(game => (
              <GameImgTitleCard game={game} key={game.id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PopularGamesSection;
