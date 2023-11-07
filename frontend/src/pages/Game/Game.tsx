import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { stringToHexColor } from "@/utils/stringToColor";
import { GameApi } from "@/api/GameApi";
import { useTheme } from "@/components/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const Game: FC = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", { id }],
    queryFn: () => GameApi.getOne(parseInt(id)),
    onError: () => {
      toast({
        title: t("gameError"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      navigate(URLS.GAMES);
    },
  });
  const divRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const setWidthToHeight = () => {
      if (divRef.current) {
        const height = divRef.current.clientHeight;
        divRef.current.style.width = `${height}px`;
      }
    };

    setWidthToHeight();
    window.addEventListener("resize", setWidthToHeight);
    return () => {
      window.removeEventListener("resize", setWidthToHeight);
    };
  }, []);

  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="relative flex-grow rounded-lg bg-section">
        <div
          className="absolute bottom-4 left-4 right-4 top-4 rounded-lg opacity-50 dark:opacity-40"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, ${
              game
                ? color === "dark"
                  ? stringToHexColor(game.name, 0.6, 0.4)
                  : stringToHexColor(game.name, 0.7, 0.5)
                : "#ddd"
            } 100%)`,
          }}
        />
        <div className="absolute bottom-8 left-8 right-8 top-8 flex flex-row gap-4">
          {isLoading ? (
            <>
              <div ref={divRef} className="h-full w-[265px]">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            </>
          ) : (
            game && (
              <>
                <div
                  className="h-full w-[265px] overflow-hidden rounded-lg bg-section"
                  ref={divRef}
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold">{game.name}</h1>
                  <div className="flex flex-row flex-wrap gap-1">
                    {game.categories.map(({ id, name }) => (
                      <Badge key={id}>
                        <Link to={`${URLS.CATEGORY_GAMES}/${id}`} className="text-sm">
                          {name}
                        </Link>
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
      <div className="flex-grow rounded-lg bg-section"></div>
    </div>
  );
};

export default Game;
