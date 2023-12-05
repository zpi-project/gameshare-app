import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";

interface GameInstanceCardProps {
  gameInstance: GameInstanceDetails;
  setActive: (uuid: string) => void;
}

const GameInstanceCard: FC<GameInstanceCardProps> = ({
  gameInstance: {
    uuid,
    pricePerDay,
    images,
    description,
    game: { name, image },
    avgRating,
    opinionsAmount,
    owner: { uuid: ownerUUID },
  },
  setActive,
}) => {
  const instanceImage = images[0]?.link ?? image;
  const { t } = useTranslation();
  return (
    <Link
      className="flex w-full flex-row gap-4 rounded-lg bg-card p-3 hover:bg-accent"
      to={`${URLS.GAME_INSTANCE}/${uuid}`}
      onMouseEnter={() => setActive(ownerUUID)}
      onMouseLeave={() => setActive("")}
    >
      <div className="h-32 w-32 overflow-hidden rounded-lg">
        <img src={instanceImage} alt={name} className="h-full w-full object-cover object-top" />
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
            <Badge variant="secondary" className="w-max px-3 py-1 hover:bg-primary">
              {t("noOpinions")}
            </Badge>
          )}
        </div>
        <PriceBadge price={pricePerDay} />
        <p className="line-clamp-3 break-all text-sm italic">{description}</p>
      </section>
    </Link>
  );
};

export default GameInstanceCard;
