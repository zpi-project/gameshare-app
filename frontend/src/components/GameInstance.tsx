import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { URLS } from "@/constants/urls";
import { GameInstance as GameInstanceType } from "@/types/Game";
import AgeBadge from "./Badge/AgeBadge";
import PlayersBadge from "./Badge/PlayersBadge";
import PriceBadge from "./Badge/PriceBadge";
import TimeBadge from "./Badge/TimeBadge";
import { Button } from "./ui/button";

interface Props {
  gameInstance: GameInstanceType;
  showButtons: boolean;
}

const GameInstance: FC<Props> = ({
  gameInstance: {
    uuid,
    game: { name, maxPlayers, minPlayers, image, playingTime, age },
    shortDescription,
    pricePerDay,
    active,
  },
  showButtons,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-row">
      <Link
        to={`${URLS.GAME_INSTANCE}/${uuid}`}
        className="items-top flex w-full flex-row gap-3 rounded-lg bg-card p-3 shadow duration-300 hover:bg-accent"
      >
        <div className="h-32 w-32 overflow-hidden rounded-lg">
          <img src={image} alt={name} className="h-full w-full object-cover object-top" />
        </div>
        {/* img nie było kwadratem bo div nizej ma w-full */}
        <section className="flex w-[calc(100%-140px)] flex-grow flex-col items-start gap-2">
          <div className="flex w-full flex-row justify-between gap-2">
            <h3 className="text-2xl text-primary">{name}</h3>
            <div className="flex flex-row flex-wrap justify-end gap-1">
              <TimeBadge time={playingTime} />
              <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
              <AgeBadge age={age} />
            </div>
          </div>
          {/* zmienilam na break all */}
          <div className="flex w-full flex-row justify-between gap-2">
            <p className="min-h-8 break-all text-xs italic">{shortDescription}</p>
            <div className="flex flex-col items-end">
              <PriceBadge price={pricePerDay} />
              {!active && <div className="text-xl text-red-500">{t("deactivated")}</div>}
            </div>
          </div>
        </section>
      </Link>
      {showButtons && (
        // tak jak w designie, że buttony do dołu i do góry równo
        <div className="ml-4 flex flex-col justify-between gap-4">
          <Button className="h-16 w-14 flex-grow bg-card">
            <Pencil />
          </Button>
          <Button className="h-16 w-14 flex-grow bg-card">
            <CalendarDays />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameInstance;
