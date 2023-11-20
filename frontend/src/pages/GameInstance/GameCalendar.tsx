import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GameInstanceDetails } from "@/types/GameInstance";
import { NewReservation } from "@/types/Reservation";
import { cn } from "@/utils/tailwind";
import { AvailabilityCalendar } from "@/components/Calendar";
import GameInstanceDetailsCard from "@/components/GameInstanceDetailsCard";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import ReservationForm from "./ReservationForm";

interface GameCalendarProps {
  gameInstance: GameInstanceDetails;
}

const GameCalendar: FC<GameCalendarProps> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const { uuid } = gameInstance;
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState<NewReservation | undefined>();

  return (
    <DialogContent
      className="min-h-[724px] min-w-[620px] p-10 lg:min-w-[1042px]"
      onCloseAutoFocus={() => {
        setShowForm(false);
      }}
    >
      <div className="flex flex-row gap-6">
        {showForm ? (
          <ReservationForm gameInstance={gameInstance} onSubmit={setFormValues} />
        ) : (
          <div className="hidden lg:flex">
            <GameInstanceDetailsCard gameInstance={gameInstance} />
          </div>
        )}
        <Separator
          orientation="vertical"
          className={cn(!showForm && "hidden", "mr-2 bg-secondary lg:flex")}
        />
        <div className="flex flex-grow flex-col gap-8">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl uppercase text-secondary">{t("availabilityCalendar")}</h2>
            {!showForm && (
              <Button variant="secondary" className="uppercase" onClick={() => setShowForm(true)}>
                {t("bookItNow")}
              </Button>
            )}
          </div>
          <AvailabilityCalendar
            gameInstanceUUID={uuid}
            startDate={formValues?.startDate}
            endDate={formValues?.endDate}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default GameCalendar;
