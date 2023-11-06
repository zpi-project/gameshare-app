import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { stringToHexColor } from "@/utils/stringToColor";
import { CategoryApi } from "@/api/CategoryApi";
import { GameApi } from "@/api/GameApi";
import GameSearchBar from "@/components/GameSearchBar";
import { useTheme } from "@/components/ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const GAME_PAGE_SIZE = 16;

const CategoryGameSearch: FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", { id }],
    queryFn: () => CategoryApi.getOne(parseInt(id)),
    onError: () => {
      // handle error toast, redirect to search game page
    },
  });

  const {
    data: games,
    isFetchingNextPage,
    // isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["games", { id }],
    queryFn: ({ pageParam = 0 }) =>
      GameApi.search(pageParam as number, GAME_PAGE_SIZE, "", [parseInt(id)]),
    getNextPageParam: (_, pages) => {
      const newPageParam = pages.length;
      return newPageParam < pages[0].paginationInfo.totalPages ? newPageParam : undefined;
    },
    enabled: category !== undefined,
  });
  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });
  const { theme } = useTheme();
  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <div className="relative h-full w-full rounded-lg bg-section p-8">
      <div
        className="absolute left-4 right-4 top-4 h-1/2 rounded-lg p-4 opacity-30"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, ${
            category
              ? color === "dark"
                ? stringToHexColor(category.name, 0.6, 0.4)
                : stringToHexColor(category.name, 0.8, 0.7)
              : "#ddd"
          } 100%)`,
        }}
      />
      <header className="flex w-full flex-grow flex-row justify-between">
        {isLoading ? (
          <Skeleton className="h-10 w-1/3 rounded-lg tracking-wider" />
        ) : (
          category && <h1 className="text-3xl">{category.name}</h1>
        )}
        {id.length && (
          <GameSearchBar
            onGameClick={(game: Game) => navigate(`${URLS.GAMES}/${game.id}`)}
            placeholder={t("searchGameWithinCategoryPlaceholder")}
            categories={[parseInt(id)]}
          />
        )}
      </header>
      <ScrollArea></ScrollArea>
    </div>
  );
};

export default CategoryGameSearch;
