import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { URLS } from "@/constants/urls";
import { stringToHexColor } from "@/utils/stringToColor";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/ui/use-toast";
import GameInstanceDetailsSection from "./GameInstanceDetailsSection";

const GameInstance: FC = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
//   const [location, setLocation] = useRecoilState(locationState);

  const { data: gameInstance, isLoading } = useQuery({
    queryKey: ["gameInstance"],
    queryFn: () => GameInstanceApi.getByUUID(id),
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
          className="absolute bottom-4 left-4 right-4 top-4 rounded-lg opacity-50 dark:opacity-40"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, ${
              gameInstance
                ? color === "dark"
                  ? stringToHexColor(gameInstance.description, 0.6, 0.4)
                  : stringToHexColor(gameInstance.description, 0.7, 0.5)
                : "#ddd"
            } 100%)`,
          }}
        />
      </div>
      <div className="absolute bottom-10 left-10 right-10 top-10 flex flex-row gap-8">
          {gameInstance && <GameInstanceDetailsSection gameInstance={gameInstance} />}
        </div>
    </div>
  );
};

export default GameInstance;
