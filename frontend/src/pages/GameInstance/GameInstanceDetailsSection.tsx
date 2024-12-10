import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import { UserApi } from "@/api/UserApi";
import PriceBadge from "@/components/Badge/PriceBadge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GameInstanceOpinions from "./GameInstanceOpinions";

interface GameDetailsSectionProps {
  gameInstance: GameInstanceDetails;
  color: string;
}

const GameInstanceDetailsSection: FC<GameDetailsSectionProps> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = useRecoilValue(roleState);
  const token = useRecoilValue(tokenState);

  const { data: user } = useQuery({
    queryKey: ["user", { token }],
    queryFn: UserApi.get,
    enabled: role !== "guest",
  });

  const isMyGame = user?.uuid === gameInstance.owner.uuid;
  return (
    <div className="relative flex w-full flex-col gap-3 xl:h-full">
      <div className="mb-4 flex flex-col gap-4 md:flex-row xl:flex-col xl:gap-2">
        <div className="relative h-64 w-64 rounded-lg xl:h-auto xl:w-full">
          <div className="h-64 w-64 overflow-hidden rounded-lg xl:h-auto xl:w-full">
            <img
              src={gameInstance.game.image}
              alt={gameInstance.game.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
          {isMyGame && (
            <Badge className="absolute -left-1 -top-1.5 px-6 text-xl shadow-md">
              {t("myGame")}
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="flex w-full flex-col justify-between">
            <h1 className="p-2 text-xl font-bold xl:text-3xl">{gameInstance.game.name}</h1>
            <div className="flex flex-col items-start gap-2 p-3">
              <PriceBadge price={gameInstance.pricePerDay} />
              {gameInstance.opinionsAmount > 0 ? (
                <div className="flex flex-row gap-2">
                  <p className="text-base tracking-widest text-foreground">
                    ({gameInstance.opinionsAmount})
                  </p>
                  <Stars count={Math.round(gameInstance.avgRating)} variant="secondary" />
                </div>
              ) : (
                <Badge variant="secondary" className="w-max px-3 py-1">
                  {t("noOpinions")}
                </Badge>
              )}
              {!gameInstance.active && (
                <Badge variant="destructive" className="uppercase">
                  {t("deactivated")}
                </Badge>
              )}
            </div>
          </div>
          <p className="break-all px-2 italic xl:text-lg">{gameInstance.description}</p>
          <Button
            onClick={() => navigate(`${URLS.GAMES}/${gameInstance.game.id}`)}
            className="mt-auto w-max px-8 xl:ml-auto"
          >
            {t("seeGamePage")}
          </Button>
        </div>
      </div>
      <div className="mb-3 h-full rounded-lg bg-section p-2">
        <GameInstanceOpinions gameInstance={gameInstance} />
      </div>
    </div>
  );
};

export default GameInstanceDetailsSection;
