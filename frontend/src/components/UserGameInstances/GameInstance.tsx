import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { URLS } from "@/constants/urls";
import { GameInstance as GameInstanceType } from "@/types/GameInstance";
import { cn } from "@/utils/tailwind";
import { PlayersBadge, PriceBadge, TimeBadge } from "@/components/Badge";
import AgeBadge from "@/components/Badge/AgeBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Stars } from "../Stars";
import { Badge } from "../ui/badge";
import GameEditForm from "./GameInstanceEditForm";
import GameReservations from "./GameReservations";

interface Props {
  gameInstance: GameInstanceType;
  showButtons?: boolean;
  userId: string;
}

const GameInstance: FC<Props> = ({ gameInstance, showButtons, userId }) => {
  const { t } = useTranslation();
  const {
    uuid,
    game: { name, maxPlayers, minPlayers, image, playingTime, age },
    description,
    pricePerDay,
    avgRating,
    opinionsAmount,
    active,
  } = gameInstance;

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="flex w-full flex-row">
      <Link
        to={`${URLS.GAME_INSTANCE}/${uuid}`}
        className={cn(
          "items-top flex w-full flex-row gap-3 rounded-lg bg-card p-3 shadow duration-300 hover:bg-accent",
          !active && "bg-destructive/30",
        )}
      >
        <div className="h-32 w-32 overflow-hidden rounded-lg">
          <img src={image} alt={name} className="h-full w-full object-cover object-top" />
        </div>
        <section className="flex w-[calc(100%-140px)] flex-grow flex-col items-start gap-2">
          <div className="flex w-full flex-row justify-between gap-2">
            <h3 className="text-2xl text-primary">{name}</h3>
            <div className="flex flex-row flex-wrap justify-end gap-1">
              <TimeBadge time={playingTime} />
              <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
              <AgeBadge age={age} />
            </div>
          </div>
          <div className="flex w-full flex-row justify-between gap-2">
            <p className="min-h-8 break-all text-xs italic">{description}</p>
            <div className="flex flex-col items-end gap-2">
              {opinionsAmount > 0 ? (
                <div className="ml-4 flex flex-row gap-2">
                  <p className="text-base tracking-widest text-foreground">({opinionsAmount})</p>
                  <Stars count={Math.round(avgRating)} variant="secondary" />
                </div>
              ) : (
                <Badge variant="secondary" className="w-max px-3 py-1 hover:bg-primary">
                  {t("noOpinions")}
                </Badge>
              )}
              <PriceBadge price={pricePerDay} />
              {!active && (
                <Badge className="text-sm uppercase" variant="destructive">
                  {t("deactivated")}
                </Badge>
              )}
            </div>
          </div>
        </section>
      </Link>
      {showButtons && (
        <div className="ml-4 flex flex-col justify-between gap-4">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-16 w-14 flex-grow bg-card">
                <Pencil />
              </Button>
            </DialogTrigger>
            <GameEditForm
              id={gameInstance.uuid}
              onClose={() => setIsEditDialogOpen(false)}
              userId={userId}
            />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-16 w-14 flex-grow bg-card">
                <CalendarDays />
              </Button>
            </DialogTrigger>
            <GameReservations gameInstance={gameInstance} />
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default GameInstance;
