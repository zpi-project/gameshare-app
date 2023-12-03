import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useRecoilValue } from "recoil";
import { useDebounce } from "use-debounce";
import { roleState } from "@/state/role";
import { Game } from "@/types/Game";
import { GameApi } from "@/api/GameApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import GameSearchCard from "./GameSearchCard";

const GAME_PAGE_SIZE = 8;

interface GameSearchBarProps {
  onGameClick: (game: Game) => void;
  placeholder: string;
  categories?: number[];
}

const GameSearchBar: FC<GameSearchBarProps> = ({ onGameClick, placeholder, categories }) => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  const [blurTimeout, setBlurTimeout] = useState<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();
  const {
    data: games,
    isFetchingNextPage,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["games", { debouncedSearch }],
    queryFn: ({ pageParam = 0 }) =>
      GameApi.search(pageParam as number, GAME_PAGE_SIZE, debouncedSearch, categories),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
  });

  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });
  const role = useRecoilValue(roleState);

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, isLoading]);

  const onBlur = () => {
    const timeout = setTimeout(() => {
      setShowResults(false);
    }, 200);
    setBlurTimeout(timeout);
  };

  const onFocus = () => {
    if (blurTimeout) {
      clearTimeout(blurTimeout);
      setBlurTimeout(null);
    }
    setShowResults(true);
  };

  return (
    <div className="relative max-w-[700px] flex-grow">
      <Search className="absolute right-4 top-2" />
      <Input
        placeholder={placeholder}
        className="rounded-lg border-none bg-card"
        onChange={e => setSearch(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showResults && (
        <div className="absolute left-0 top-12 z-10 h-[400px] w-full rounded-lg bg-background p-2 shadow">
          <ScrollArea className="h-full w-full pr-4">
            <div className="flex flex-col gap-1">
              {isError ? (
                <h4 className="mt-4 text-center text-xl text-destructive">
                  {t("searchGamesError")}
                </h4>
              ) : games && games.pages[0].paginationInfo.totalElements > 0 ? (
                games.pages.map(page =>
                  page.results.map(game => (
                    <GameSearchCard game={game} key={game.id} onClick={onGameClick} />
                  )),
                )
              ) : (
                <>
                  <h4 className="ml-2 mt-2 text-xl">{t("noResults")}</h4>
                  {role !== "guest" && (
                    <>
                      <p className="p-2 italic">{t("cannotFindGame")}</p>
                      <Button className="ml-auto mt-4 w-max">{t("addGame")}</Button>
                    </>
                  )}
                </>
              )}
              {(isFetchingNextPage || isLoading) && (
                <>
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton className="h-20 w-full rounded-lg" key={"skeleton" + idx} />
                  ))}
                </>
              )}
              {hasNextPage && <div ref={ref} data-test="scroller-trigger" />}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default GameSearchBar;
