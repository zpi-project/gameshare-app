import { FC } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { GameInstance } from "@/types/GameInstance";
import { TimeBadge, PlayersBadge, AgeBadge, PriceBadge } from "@/components/Badge";

interface GameResultProps {
  gameInstance: GameInstance;
}

const GameResult: FC<GameResultProps> = ({
  gameInstance: {
    uuid,
    pricePerDay,
    game: { name, image, minPlayers, maxPlayers, age, playingTime, shortDescription },
    avgRating,
  },
}) => {
  return (
    <Link
      className="flex flex-row gap-2 rounded-lg bg-card p-2 hover:bg-accent"
      to={`${URLS.GAME_INSTANCE}/${uuid}}`}
    >
      <div className="h-32 w-32 overflow-hidden rounded-lg">
        <img src={image} alt={name} className="h-full w-full object-cover object-top" />
      </div>
      <section className="flex w-[calc(100%-140px)] flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h3 className="text-primary text-lg font-bold">{name}</h3>
          <>stars</>
        </div>
        <div className="flex w-full flex-row justify-between">
          <PriceBadge price={pricePerDay} />
          <div className="flex flex-row flex-wrap gap-1">
            <TimeBadge time={playingTime} />
            <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
            <AgeBadge age={age} />
          </div>
        </div>
        <p className="line-clamp-2 text-sm italic">{shortDescription}</p>
      </section>
    </Link>
  );
};

export default GameResult;
