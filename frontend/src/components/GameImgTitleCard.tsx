import { FC } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { cn } from "@/utils/tailwind";

interface GameImgTitleCardProps {
  game: Game;
  className?: string;
}

const GameImgTitleCard: FC<GameImgTitleCardProps> = ({ game: { name, image, id }, className }) => {
  return (
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
  );
};

export default GameImgTitleCard;
