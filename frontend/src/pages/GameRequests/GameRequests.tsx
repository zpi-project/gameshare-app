import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GameApi } from "@/api/GameApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import GameRequest from "./GameRequest";

const GAME_PAGE_SIZE = 8;

const GameRequests: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();

  const {
    data: games,
    isFetchingNextPage,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["game-requests", { language }],
    queryFn: ({ pageParam = 0 }) => GameApi.getPending(pageParam as number, GAME_PAGE_SIZE),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("gameRequestsError"),
        description: t("tryRefreshing"),
      });
    },
  });

  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, isLoading]);

  return (
    <div className="relative flex h-full w-full flex-col gap-8 rounded-lg bg-section p-8">
      <div
        className="absolute left-4 right-4 top-4 h-1/2 rounded-lg opacity-50 dark:opacity-40"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(133, 43, 130) 100%)`,
        }}
      />
      <h1 className="relative text-2xl uppercase">{t("gameRequests")}</h1>
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <>
              {Array.from({ length: GAME_PAGE_SIZE }).map((_, idx) => (
                <Skeleton className="h-40 w-full rounded-lg" key={idx} />
              ))}
            </>
          ) : (
            !isError &&
            (games.pages[0].paginationInfo.totalElements > 0 ? (
              games.pages
                .flatMap(page => page.results)
                .map((game, idx) => <GameRequest key={idx} game={game} />)
            ) : (
              <h2 className="mt-4 text-xl lg:text-center">{t("noGameRequests")}</h2>
            ))
          )}
          {isFetchingNextPage && <Skeleton className="h-40 w-full rounded-lg" />}
          {hasNextPage && <div ref={ref} data-test="scroller-trigger" />}
        </div>
      </ScrollArea>
    </div>
  );
};

export default GameRequests;
