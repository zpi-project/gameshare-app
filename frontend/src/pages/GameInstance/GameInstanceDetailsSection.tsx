import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { GameInstanceDetails } from "@/types/GameInstance";
import { TimeBadge, PlayersBadge, AgeBadge } from "@/components/Badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex h-full w-full flex-col gap-3  px-4">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-3 pt-6">
          <img
            src={gameInstance.game.image}
            alt={gameInstance.game.name}
            className=" h-24 w-24 overflow-hidden rounded-lg object-cover"
          />
          <img
            src={gameInstance.game.image}
            alt={gameInstance.game.name}
            className=" h-24 w-24 overflow-hidden rounded-lg object-cover"
          />
          <img
            src={gameInstance.game.image}
            alt={gameInstance.game.name}
            className=" h-24 w-24 overflow-hidden rounded-lg object-cover"
          />
        </div>
        <img
          src={gameInstance.game.image}
          alt={gameInstance.game.name}
          className="h-96 w-96 overflow-hidden rounded-lg object-cover pb-5"
        />
      </div>
      <div className="flex flex-col gap-2  lg:gap-4">
        <h1 className="p-2 text-xl font-bold xl:text-3xl">{gameInstance.game.name}</h1>
        <p className="px-2 italic xl:text-lg 2xl:w-3/4">{gameInstance.description}</p>
      </div>
      <Button className="absolute bottom-5 left-5">See game page</Button>
      <Button className="absolute bottom-5 right-5">See availability</Button>
    </div>
  );
};

export default GameInstanceDetailsSection;
