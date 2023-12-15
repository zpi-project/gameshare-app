import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { SearchGameInstance } from "@/types/GameInstance";
import { TimeBadge, PlayersBadge, AgeBadge, PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";

interface GameInstanceSearchCardProps {
  gameInstance: SearchGameInstance;
  setActive: (uuid: string) => void;
}

const GameInstanceSearchCard: FC<GameInstanceSearchCardProps> = ({
  gameInstance: {
    uuid,
    pricePerDay,
    description,
    game: { name, image, minPlayers, maxPlayers, age, playingTime },
    avgRating,
    opinionsAmount,
    owner: { uuid: ownerUUID },
  },
  setActive,
}) => {
  const { t } = useTranslation();

  return (
    <Link
      className="flex flex-row gap-4 rounded-lg bg-card p-3 hover:bg-accent"
      to={`${URLS.GAME_INSTANCE}/${uuid}`}
      onMouseEnter={() => setActive(ownerUUID)}
      onMouseLeave={() => setActive("")}
    >
      <div className="h-32 w-32 overflow-hidden rounded-lg">
        <img src={image} alt={name} className="h-full w-full object-cover object-top" />
      </div>
      <section className="flex w-[calc(100%-140px)] flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold text-primary">{name}</h3>
          {opinionsAmount > 0 ? (
            <div className="flex flex-row gap-2">
              <p className="text-base tracking-widest text-foreground">({opinionsAmount})</p>
              <Stars count={Math.round(avgRating)} variant="secondary" />
            </div>
          ) : (
            <Badge variant="secondary" className="hidden md:flex w-max px-3 py-1">
              {t("noOpinions")}
            </Badge>
          )}
        </div>
        <div className="flex w-full flex-row justify-between">
          <PriceBadge price={pricePerDay} />
          <div className="hidden sm:flex flex-row flex-wrap gap-1">
            <TimeBadge time={playingTime} />
            <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
            <AgeBadge age={age} />
          </div>
        </div>
        <p className="hidden md:flex line-clamp-2 break-all text-sm italic">{description}</p>
      </section>
    </Link>
  );
};

export default GameInstanceSearchCard;
