import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { stringToHexColor } from "@/utils/stringToColor";
import { GameApi } from "@/api/GameApi";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/ui/use-toast";

const Game: FC = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: game, isLoading } = useQuery({
    queryKey: ["games", { id }],
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

  const { theme } = useTheme();

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
          className="absolute bottom-4 left-4 right-4 top-4 rounded-lg opacity-50 dark:opacity-40 -z-1"
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
        <div className="flex flex-row p-8">
          {isLoading ? (
            <></>
          ) : (
            game && (
              <>
                <div className="h-[265px] w-[265px] overflow-hidden rounded-lg bg-section">
                  <img src={game.image} alt={game.name} className="h-full w-full object-cover" />
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
