import { FC } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import { PriceBadge } from "@/components/Badge";
import Stars from "@/components/Stars";

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
    owner: { uuid: ownerUUID },
  },
  setActive,
}) => {
  const instanceImage = images[0]?.link ?? image;

  return (
    <Link
      className="flex w-full flex-row gap-4 rounded-lg bg-card p-3 hover:bg-accent"
      to={`${URLS.GAME_INSTANCE}/${uuid}}`}
      onMouseEnter={() => setActive(ownerUUID)}
      onMouseLeave={() => setActive("")}
    >
      <div className="h-32 w-32 overflow-hidden rounded-lg">
        <img src={instanceImage} alt={name} className="h-full w-full object-cover object-top" />
      </div>
      <section className="flex w-[calc(100%-140px)] flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold text-primary">{name}</h3>
          {avgRating > 0 && <Stars count={avgRating} variant="secondary" />}
        </div>
        <PriceBadge price={pricePerDay} />
        <p className="line-clamp-3 break-all text-sm italic">{description}</p>
      </section>
    </Link>
  );
};

export default GameInstanceCard;

// backend pytania
// czy zwracane nieaktywne gry?
// images czy gameInstanceImage ?
// czy moje instancje tej gry tez maja byc zwracane
