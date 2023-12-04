import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { stringToHexColor } from "@/utils/stringToColor";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/ui/use-toast";
import GameInstanceDetailsSection from "./GameInstanceDetailsSection";
import GameInstanceOpinions from "./GameInstanceOpinions";
import GameInstanceUserDetailsSection from "./GameInstanceUserDetailsSection";

const GameInstance: FC = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: gameInstance, isLoading } = useQuery({
    queryKey: ["gameInstance", { id }],
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
    <div className="flex h-full w-full flex-row gap-6">
      {gameInstance && (
        <>
          <div className="relative w-1/3 flex-grow rounded-lg bg-section p-4">
            <div
              className="absolute bottom-0 left-0 right-0 top-0 rounded-lg opacity-50 dark:opacity-40"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, ${
                  gameInstance
                    ? color === "dark"
                      ? stringToHexColor(gameInstance.game.name, 0.6, 0.4)
                      : stringToHexColor(gameInstance.game.name, 0.7, 0.5)
                    : "#ddd"
                } 100%)`,
              }}
            />
            {gameInstance && (
              <GameInstanceDetailsSection gameInstance={gameInstance} color={color} />
            )}
          </div>
          <div className="flex h-full w-2/3 flex-grow flex-col gap-5">
            <div className="flex h-[400px] w-full flex-row gap-5">
              <div className="h-full w-3/5 overflow-hidden rounded-lg">
                <Map
                  autolocate
                  location={[
                    gameInstance.owner.locationLatitude,
                    gameInstance.owner.locationLongitude,
                  ]}
                >
                  <LocationButton />
                  <LocationMarker />
                </Map>
              </div>
              <div className="h-full w-2/5 rounded-lg bg-section p-4">
                <GameInstanceUserDetailsSection user={gameInstance.owner} isLoading={isLoading} />
              </div>
            </div>
            <div className="flex h-[calc(100%-400px)] rounded-lg bg-section">
              <GameInstanceOpinions gameInstance={gameInstance} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInstance;
