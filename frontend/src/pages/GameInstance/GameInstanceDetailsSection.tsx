import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { TimeBadge, PlayersBadge, AgeBadge } from "@/components/Badge";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GameInstanceDetails } from "@/types/GameInstance";

interface GameDetailsSectionProps {
  gameInstance: GameInstanceDetails;
}

const GameInstanceDetailsSection: FC<GameDetailsSectionProps> = ({ gameInstance }) => {
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
        <div className="h-full overflow-hidden rounded-lg bg-section" ref={divRef}>
            <img src={gameInstance.game.image} alt={gameInstance.game.name} className="h-full w-full object-cover object-top" />
        </div>
        <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-xl font-bold xl:text-3xl">{gameInstance.game.name}</h1>
            <p className="p-2 italic xl:text-lg 2xl:w-3/4">{gameInstance.description}</p>
        </div>
    </>
  );
};

export default GameInstanceDetailsSection;
