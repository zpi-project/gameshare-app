import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import { NewReservation } from "@/types/Reservation";
import useIsDesktop from "@/utils/useIsDesktop";
import { ReservationsApi } from "@/api/ReservationsApi";
import Spinner from "@/components/ui/Spinner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import ReservationForm from "./ReservationForm";

interface GameCalendarProps {
  gameInstance: GameInstanceDetails;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
}

const GameCalendar: FC<GameCalendarProps> = ({ gameInstance, showForm, setShowForm }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [newReservationId, setNewReservationId] = useState("");
  const isDesktop = useIsDesktop();

  const { mutate, isLoading } = useMutation({
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
    <>
      {isLoading && <Spinner />}
      {isDesktop ? (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent>
            <div className="flex flex-row gap-6">
              <ReservationForm gameInstance={gameInstance} onSubmit={mutate} />
              {newReservationId.length > 0 && (
                <div className="flex w-[364px] min-w-[364px] flex-grow flex-col items-center justify-center gap-8 rounded-lg bg-section p-8">
                  <p className="text-center text-xl">{t("createReservationSuccessDescription")}</p>
                  <Link
                    to={`${URLS.MY_RESERVATIONS}/${newReservationId}`}
                    className="rounded-lg bg-secondary px-4 py-2 text-center uppercase duration-300 hover:bg-accent"
                  >
                    {t("seeReservation")}
                  </Link>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={showForm} onOpenChange={setShowForm}>
          <DrawerContent>
            <div className="flex flex-row gap-6">
              <ReservationForm gameInstance={gameInstance} onSubmit={mutate} />
              {newReservationId.length > 0 && (
                <div className="flex w-[364px] min-w-[364px] flex-grow flex-col items-center justify-center gap-8 rounded-lg bg-section p-8">
                  <p className="text-center text-xl">{t("createReservationSuccessDescription")}</p>
                  <Link
                    to={`${URLS.MY_RESERVATIONS}/${newReservationId}`}
                    className="rounded-lg bg-secondary px-4 py-2 text-center uppercase duration-300 hover:bg-accent"
                  >
                    {t("seeReservation")}
                  </Link>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default GameCalendar;
