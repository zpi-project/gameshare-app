import { FC } from "react";
import { Game } from "@/types/Game";
import AgeBadge from "./Badge/AgeBadge";
import PlayersBadge from "./Badge/PlayersBadge";
import TimeBadge from "./Badge/TimeBadge";

interface GameSearchCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameSearchCard: FC<GameSearchCardProps> = ({ game, onClick }) => {
  const { image, name, minPlayers, maxPlayers, playingTime, age } = game;

  return (
    <div
      className="relative flex w-full cursor-pointer flex-row gap-2 rounded-lg bg-card p-2 shadow duration-200 hover:bg-accent"
      onClick={() => onClick(game)}
    >
      <div className="h-16 w-16 overflow-hidden rounded-lg">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <h4 className="text-xl text-primary">{name}</h4>
      <div className="absolute bottom-2 right-2 flex h-max flex-row gap-1 self-end">
        <TimeBadge time={playingTime} />
        <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
        <AgeBadge age={age} />
      </div>
    </div>
  );
};

export default GameSearchCard;
