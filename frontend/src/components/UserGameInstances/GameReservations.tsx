import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GameInstance } from "@/types/GameInstance";
import { ReservationsCalendar } from "@/components/Calendar";
import GameInstanceDetailsCard from "@/components/GameInstanceDetailsCard";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface GameReservationsProps {
  gameInstance: GameInstance;
}

const GameReservations: FC<GameReservationsProps> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const { uuid } = gameInstance;

  return (
    <DialogContent className="min-h-[724px] min-w-[620px] p-10 lg:min-w-[1042px]">
      <div className="flex flex-row gap-6">
        <div className="hidden lg:flex">
          <GameInstanceDetailsCard gameInstance={gameInstance} />
        </div>
        <Separator orientation="vertical" className="mr-2 hidden bg-secondary lg:flex" />
        <div className="flex flex-grow flex-col gap-8">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl uppercase text-secondary">{t("reservationsCalendar")}</h2>
            {gameInstance.active ? (
              <Button variant="destructive" className="uppercase">
                {t("deactivate")}
              </Button>
            ) : (
              <Button variant="secondary" className="uppercase">
                {t("activate")}
              </Button>
            )}
          </div>
          <ReservationsCalendar gameInstanceUUID={uuid} />
        </div>
      </div>
    </DialogContent>
  );
};

export default GameReservations;
