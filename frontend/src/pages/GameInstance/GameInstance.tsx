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
import Opinions from "@/components/Opinions";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/ui/use-toast";
import GameInstanceDetailsSection from "./GameInstanceDetailsSection";
import GameInstanceUserDetailsSection from "./GameInstanceUserDetailsSection";

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
    <div className="flex h-full w-full flex-row gap-6">
      {gameInstance && (
        <>
          <div className="relative w-1/3 flex-grow rounded-lg bg-section">
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
            <div className="absolute bottom-5 left-5 right-5 top-5 flex flex-row">
              {gameInstance && <GameInstanceDetailsSection gameInstance={gameInstance} />}
            </div>
          </div>

          <div className="flex w-2/3 flex-grow flex-col gap-5">
            <div className="flex h-[550px] w-full flex-row gap-5">
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
                <GameInstanceUserDetailsSection
                  user={gameInstance.owner}
                  isLoading={isLoading}
                  showEdit
                />
              </div>
            </div>
            <div className="flex h-full rounded-lg bg-section">
              <Opinions />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInstance;
