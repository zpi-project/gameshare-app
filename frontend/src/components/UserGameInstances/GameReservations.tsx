import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { GameInstance } from "@/types/GameInstance";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { ReservationsCalendar } from "@/components/Calendar";
import GameInstanceDetailsCard from "@/components/GameInstanceDetailsCard";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import Spinner from "../ui/Spinner";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

interface GameReservationsProps {
  gameInstance: GameInstance;
}

const GameReservations: FC<GameReservationsProps> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const { uuid } = gameInstance;

  const queryClient = useQueryClient();
  const { mutate: deactivate, isLoading: deactivateLoading } = useMutation({
    mutationFn: () => GameInstanceApi.deactivate(uuid),
    onError: () => {
      toast({
        title: t("deactivateErrorTitle"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: t("deactivateSuccessDescription"),
      });
      queryClient.invalidateQueries(["user-game-instances"]);
      queryClient.invalidateQueries(["reservations-calendar"]);
    },
  });

  const { mutate: activate, isLoading: activateLoading } = useMutation({
    mutationFn: () => GameInstanceApi.activate(uuid),
    onError: () => {
      toast({
        title: t("activateErrorTitle"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: t("activateSuccessDescription"),
      });
      queryClient.invalidateQueries(["user-game-instances"]);
      queryClient.invalidateQueries(["reservations-calendar"]);
    },
  });

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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="uppercase">
                    {t("deactivate")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
                    <AlertDialogDescription>{t("deactivationWarning")}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deactivate()}>
                      {t("continue")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="uppercase">
                    {t("activate")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
                    <AlertDialogDescription>{t("activationWarning")}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => activate()}>
                      {t("continue")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <ReservationsCalendar gameInstanceUUID={uuid} />
        </div>
      </div>
      {(deactivateLoading || activateLoading) && <Spinner />}
    </DialogContent>
  );
};

export default GameReservations;
