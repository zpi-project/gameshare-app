import { FC } from "react";
import { GameInstance, GameInstanceDetails } from "@/types/GameInstance";
import { stringToHexColor } from "@/utils/stringToColor";
import { PriceBadge } from "./Badge";
import { Stars } from "./Stars";
import { useTheme } from "./ThemeProvider";

interface GameInstanceDetailsCardProps {
  gameInstance: GameInstance | GameInstanceDetails;
}

const GameInstanceDetailsCard: FC<GameInstanceDetailsCardProps> = ({
  gameInstance: {
    description,
    game: { name, image },
    avgRating,
    pricePerDay,
  },
}) => {
  const { theme } = useTheme();

  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <div className="relative h-full w-[364px] rounded-lg bg-section p-4">
      <div
        className="absolute bottom-4 left-4 right-4 top-4 rounded-lg opacity-50 dark:opacity-40"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, ${
            color === "dark" ? stringToHexColor(name, 0.6, 0.4) : stringToHexColor(name, 0.7, 0.5)
          } 100%)`,
        }}
      />
      <div className="absolute flex flex-col gap-3 p-4">
        <div className="h-[300px] w-[300px] overflow-hidden rounded-lg bg-section">
          <img src={image} alt={name} className="h-full w-full object-cover object-top" />
        </div>
        <h3 className="text-xl">{name}</h3>
        <div className="flex flex-row justify-between">
          {avgRating > 0 && <Stars count={avgRating} variant="secondary" />}
          <PriceBadge price={pricePerDay} />
        </div>
        <p className="mt-2 line-clamp-6 break-words italic">{description}</p>
      </div>
    </div>
  );
};

export default GameInstanceDetailsCard;
