import { FC } from "react";
import { Link } from "react-router-dom";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { cn } from "@/utils/tailwind";
import { TooltipTrigger, Tooltip, TooltipProvider } from "@/components/ui/tooltip";

interface GameImgTitleCardProps {
  game: Game;
  className?: string;
}

const GameImgTitleCard: FC<GameImgTitleCardProps> = ({ game: { name, image, id }, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            to={`${URLS.GAMES}/${id}`}
            className={cn(
              "flex w-48 flex-col gap-4 rounded-lg bg-card p-4 text-card-foreground shadow transition hover:bg-background",
              className,
            )}
          >
            <img src={image} alt={name} className="h-40 w-40 rounded-lg" />
            <h3 className="truncate">{name}</h3>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          className="absolute -right-8 z-10 mt-1 w-48 rounded-md bg-muted p-2 text-sm shadow"
          side="bottom"
          align="end"
        >
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GameImgTitleCard;
