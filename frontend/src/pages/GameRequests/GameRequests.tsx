import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { id } from "date-fns/locale";
import { GameApi } from "@/api/GameApi";
import GameRequest from "./GameRequest";

const GAME_PAGE_SIZE = 8;

const GameRequests: FC = () => {
  const { t } = useTranslation();

  const {
    data: games,
    isFetchingNextPage,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["category-games", { id }],
    queryFn: ({ pageParam = 0 }) => GameApi.getPending(pageParam as number, GAME_PAGE_SIZE),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
  });

  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });

  return (
    <div className="relative flex h-full w-full flex-col gap-8 rounded-lg bg-section p-8">
      <div
        className="absolute left-4 right-4 top-4 h-1/2 rounded-lg opacity-50 dark:opacity-40"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(133, 43, 130) 100%)`,
        }}
      />
      <h1 className="relative text-xl uppercase">{t("gameRequests")}</h1>
      <div className="">
        {isLoading ? (
          <>loading</>
        ) : isError ? (
          <>isError</>
        ) : (
          games.pages.flatMap(page => page.results).map((_, idx) => <GameRequest key={idx} />)
        )}
      </div>
    </div>
  );
};

export default GameRequests;
