import { FC, useState } from "react";
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

const GameInstance: FC<Props> = ({ gameInstance, showButtons }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="flex flex-row">
      <Link
        to={`${URLS.GAME_INSTANCE}/${gameInstance.uuid}`}
        className="items-top flex w-full flex-row gap-3 rounded-lg bg-card p-3 shadow duration-300 hover:bg-accent"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <div className="h-32 w-32 flex-grow overflow-hidden rounded-lg">
          <img
            src={gameInstance.game.image}
            alt={gameInstance.game.name}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex w-full flex-row justify-between gap-2">
            <div className="flex text-2xl text-primary">{gameInstance.game.name}</div>
            <div className="flex flex-row flex-wrap gap-1">
              <TimeBadge time={gameInstance.game.playingTime} />
              <PlayersBadge
                minPlayers={gameInstance.game.minPlayers}
                maxPlayers={gameInstance.game.maxPlayers}
              />
              <AgeBadge age={gameInstance.game.age} />
            </div>
          </div>
          <div className="flex w-full flex-row items-start justify-between gap-2">
            <div className="min-h-8 flex break-words pr-2 text-xs italic">
              {gameInstance.shortDescription}
            </div>
            <div className="flex w-max">
              <PriceBadge price={gameInstance.pricePerDay} />
            </div>
          </div>
        </div>
      </Link>
      {showButtons && (
        <div className="flex flex-col justify-between py-2.5 pl-2">
          <Button className="h-16 w-14 bg-card">
            <Pencil />
          </Button>
          <Button className="h-16 w-14 bg-card">
            <CalendarDays />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameInstance;
