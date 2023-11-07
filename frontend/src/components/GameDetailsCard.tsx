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
      className="flex w-[300px] flex-col gap-2 rounded-lg bg-card p-4 shadow-md duration-300 hover:bg-accent"
    >
      <div className="h-[265px] w-[265px] overflow-hidden rounded-lg">
        <img src={image} alt={name} className="h-full w-full object-cover object-top" />
      </div>
      <h3 className="min-h-[60px] flex-grow text-lg font-bold text-primary">{name}</h3>
      <p className="line-clamp-5 h-[125px] italic">{shortDescription}</p>
      <div className="mt-2 flex flex-row gap-1 self-end">
        <TimeBadge time={playingTime} />
        <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
        <AgeBadge age={age} />
      </div>
    </Link>
  );
};

export default GameDetailsCard;
