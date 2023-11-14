import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { TimeBadge, PlayersBadge, AgeBadge } from "@/components/Badge";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GameDetailsSectionProps {
  game: Game;
}

const GameDetailsSection: FC<GameDetailsSectionProps> = ({ game }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setWidthToHeight = () => {
      if (divRef.current) {
        const height = divRef.current.clientHeight;
        divRef.current.style.width = `${height}px`;
        divRef.current.style.minWidth = `${height}px`;
      }
    };

    setWidthToHeight();
    window.addEventListener("resize", setWidthToHeight);
    return () => {
      window.removeEventListener("resize", setWidthToHeight);
    };
  }, []);

  return (
    <>
      <div className="h-full max-h-[320px] overflow-hidden rounded-lg bg-section" ref={divRef}>
        <img src={game.image} alt={game.name} className="h-full w-full object-cover object-top" />
      </div>
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-2 lg:gap-4">
          <h1 className="text-xl font-bold xl:text-3xl">{game.name}</h1>
          <div className="flex flex-row flex-wrap gap-1">
            {game.categories.map(({ id, name }) => (
              <Badge key={id}>
                <Link to={`${URLS.CATEGORY_GAMES}/${id}`} className="text-sm">
                  {name}
                </Link>
              </Badge>
            ))}
          </div>
          <p className="p-2 italic xl:text-lg 2xl:w-3/4">{game.shortDescription}</p>
          <div className="flex flex-row flex-wrap gap-1">
            <TimeBadge time={game.playingTime} />
            <PlayersBadge minPlayers={game.minPlayers} maxPlayers={game.maxPlayers} />
            <AgeBadge age={game.age} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default GameDetailsSection;
