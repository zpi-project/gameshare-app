import { FC } from "react";
import { Game } from "@/types/Game";
import AgeBadge from "./Badge/AgeBadge";
import PlayersBadge from "./Badge/PlayersBadge";
import TimeBadge from "./Badge/TimeBadge";

interface GameSearchCardProps {
  game: Game;
  onClick?: () => void;
}

const GameSearchCard: FC<GameSearchCardProps> = ({
  game: { image, name, minPlayers, maxPlayers, playingTime, age },
  onClick,
}) => {
  return (
    <div className="flex w-full flex-row gap-2 rounded-lg bg-card p-2" onClick={onClick}>
      <div className="h-16 w-16 overflow-hidden rounded-lg">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <h4 className="text-xl text-primary">{name}</h4>
      <div className="ml-auto flex h-max flex-row gap-1 self-end">
        <TimeBadge time={playingTime} />
        <PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />
        <AgeBadge age={age} />
      </div>
    </div>
  );
};

export default GameSearchCard;
