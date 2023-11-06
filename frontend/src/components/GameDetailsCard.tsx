import { FC } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { AgeBadge, PlayersBadge, TimeBadge } from "@/components/Badge";

interface GameDetailsCardProps {
  game: Game;
}

const GameDetailsCard: FC<GameDetailsCardProps> = ({
  game: { image, name, id, shortDescription, playingTime, minPlayers, maxPlayers, age },
}) => {
  return (
    <Link
      to={`${URLS.GAMES}/${id}`}
      className="flex w-[290px] flex-col gap-2 rounded-lg bg-card p-4 duration-300 hover:bg-accent"
    >
      <div className="h-64 w-64 overflow-hidden rounded-lg">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-xl font-bold text-primary">{name}</h3>
      <p className="line-clamp-5 h-24 italic">{shortDescription}</p>
      <div className="flex flex-row gap-1">
        <TimeBadge time={playingTime} />
        <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
        <AgeBadge age={age} />
      </div>
    </Link>
  );
};

export default GameDetailsCard;
