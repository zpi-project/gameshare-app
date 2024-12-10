import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { stringToHexColor } from "@/utils/stringToColor";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { UserApi } from "@/api/UserApi";
import { AvailabilityCalendar } from "@/components/Calendar";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import BookGameInstance from "./BookGameInstance";
import GameInstanceDetailsSection from "./GameInstanceDetailsSection";
import GameInstanceUserDetailsSection from "./GameInstanceUserDetailsSection";

const GameInstance: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { instanceId: id = "" } = useParams();

  const navigate = useNavigate();
  const { toast } = useToast();
  const role = useRecoilValue(roleState);
  const token = useRecoilValue(tokenState);
  const [showForm, setShowForm] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user", { token }],
    queryFn: UserApi.get,
    enabled: role !== "guest",
  });

  const { data: gameInstance, isLoading } = useQuery({
    queryKey: ["gameInstance", { id, language }],
    queryFn: () => GameInstanceApi.getOne(id),
    onError: () => {
      toast({
        title: t("gameError"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      navigate(URLS.GAMES);
    },
  });

  const isMyGame = user?.uuid === gameInstance?.owner.uuid;

  const { theme } = useTheme();

  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <>
      <div className="flex h-full w-full flex-col gap-6 overflow-x-hidden xl:flex-row xl:flex-row">
        {isLoading && <Spinner />}
        {gameInstance && (
          <>
            <div className="relative flex-grow rounded-lg bg-section p-4 xl:w-2/3">
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
            <div className="relative flex flex-grow flex-col gap-6 rounded-lg bg-section p-4 xl:w-2/3">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-2xl uppercase text-[#428ccd]">{t("availabilityCalendar")}</h2>
                {!isMyGame && (
                  <Button
                    variant="secondary"
                    className="uppercase"
                    onClick={() => setShowForm(true)}
                  >
                    {t("bookItNow")}
                  </Button>
                )}
              </div>
              <div className="mx-auto w-[408px] xl:w-auto">
                <AvailabilityCalendar
                  gameInstanceUUID={gameInstance.uuid}
                  tileClassName="w-10 h-10 lg:w-[50px] xl:w-[64px] xl:h-[64px] lg:h-[50px]"
                />
              </div>
            </div>
            <div className="flex w-full flex-row flex-col gap-5 xl:h-full">
              <div className="rounded-lg bg-section p-4">
                <GameInstanceUserDetailsSection user={gameInstance.owner} isLoading={isLoading} />
              </div>
              <div className="h-[200px] w-full overflow-hidden rounded-lg xl:h-full">
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
            </div>
          </>
        )}
      </div>
      {gameInstance && (
        <BookGameInstance
          gameInstance={gameInstance}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </>
  );
};

export default GameInstance;
