import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import { NewReservation } from "@/types/Reservation";
import { cn } from "@/utils/tailwind";
import { ReservationsApi } from "@/api/ReservationsApi";
import { AvailabilityCalendar } from "@/components/Calendar";
import GameInstanceDetailsCard from "@/components/GameInstanceDetailsCard";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ReservationForm from "./ReservationForm";

interface GameCalendarProps {
  gameInstance: GameInstanceDetails;
}

const GameCalendar: FC<GameCalendarProps> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const { uuid } = gameInstance;
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const [newReservationId, setNewReservationId] = useState("");

  // add proper error messages when in api fixed
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (newReservation: NewReservation) => ReservationsApi.create(newReservation),
    onError: () => {
      toast({
        title: t("createReservationError"),
        variant: "destructive",
      });
    },
    onSuccess: data => {
      setNewReservationId(data.reservationId);
      toast({
        title: t("createReservationSuccess"),
      });
    },
  });

  return (
    <DialogContent
      className="min-h-[724px] min-w-[1042px] p-10"
      onCloseAutoFocus={() => {
        setShowForm(false);
        setNewReservationId("");
      }}
    >
      {isLoading && <Spinner />}
      <div className="flex flex-row gap-6">
        {newReservationId.length ? (
          <div className="flex w-[364px] min-w-[364px] flex-grow flex-col items-center justify-center gap-8 rounded-lg bg-section p-8">
            <p className="text-center text-xl">{t("createReservationSuccessDescription")}</p>
            <Link
              to={`${URLS.MY_RESERVATIONS}/${newReservationId}`}
              className="rounded-lg bg-secondary px-4 py-2 text-center uppercase duration-300 hover:bg-accent"
            >
              {t("seeReservation")}
            </Link>
          </div>
        ) : showForm ? (
          <ReservationForm gameInstance={gameInstance} onSubmit={mutate} />
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
          <AvailabilityCalendar gameInstanceUUID={uuid} />
        </div>
      </div>
    </DialogContent>
  );
};

export default GameCalendar;

// student uuid: 239bda34-a3ad-4d97-84b0-8aceb4480801
// 2023-11-1 - brak komentarza?
// 2023-11-2 - komentarz
// owner uuid: 94d0560d-9716-4a30-b1a6-5f9a97c53677
