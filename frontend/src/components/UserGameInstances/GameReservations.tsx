import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GameInstance } from "@/types/GameInstance";
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

  return (
    <DialogContent className="min-h-[800px] min-w-[1000px] p-10">
      <div className="flex flex-row gap-4">
        <div>
          <GameInstanceDetailsCard gameInstance={gameInstance} />
        </div>
        <Separator orientation="vertical" />
        <div className="flex-grow">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl uppercase text-secondary">{t("reservationsCalendar")}</h2>
            <Button variant="destructive" className="uppercase">
              {t("deactivate")}
            </Button>
          </div>
          <ReservationsCalendar />
        </div>
      </div>
    </DialogContent>
  );
};

export default GameReservations;
