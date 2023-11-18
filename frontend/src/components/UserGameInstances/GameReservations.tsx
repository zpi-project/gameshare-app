import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { GameInstance } from "@/types/GameInstance";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { ReservationsCalendar } from "@/components/Calendar";
import GameInstanceDetailsCard from "@/components/GameInstanceDetailsCard";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// add game deactivate

interface GameReservationsDialogProps {
  gameInstance: GameInstance;
}

const GameReservations: FC<GameReservationsDialogProps> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const { uuid } = gameInstance;

  return (
    <DialogContent className="min-h-[724px] p-10 lg:min-w-[1042px]">
      <div className="flex flex-row gap-6">
        <div className="hidden lg:flex">
          <GameInstanceDetailsCard gameInstance={gameInstance} />
        </div>
        <Separator orientation="vertical" className="mr-2 hidden lg:flex" />
        <div className="flex flex-grow flex-col gap-8">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl uppercase text-secondary">{t("reservationsCalendar")}</h2>
            <Button variant="destructive" className="uppercase">
              {t("deactivate")}
            </Button>
          </div>
          <ReservationsCalendar gameInstanceUUID={uuid} />
        </div>
      </div>
    </DialogContent>
  );
};

export default GameReservations;
