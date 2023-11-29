import { FC } from "react";
import { useTranslation } from "react-i18next";
import { X, Check } from "lucide-react";
import { Game } from "@/types/Game";
import { TimeBadge, PlayersBadge, AgeBadge } from "@/components/Badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface GameRequestProps {
  game: Game;
}

const GameRequest: FC<GameRequestProps> = ({ game }) => {
  const { t } = useTranslation();

  return (
    <div className="lex-row flex gap-4 rounded-lg bg-card p-4">
      <div className="max-h-full min-h-full w-[150px] min-w-[150px] flex-grow overflow-hidden rounded-lg bg-section">
        <img src={game.image} alt={game.name} className="h-full w-full object-cover object-top" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap gap-4">
          <h1 className="mr-auto text-xl font-bold xl:text-2xl">{game.name}</h1>
          <Button variant="secondary" className="flex flex-row items-center gap-2">
            <p className="uppercase">{t("accept")}</p>
            <Check size={20} />
          </Button>
          <Button variant="destructive" className="flex flex-row items-center gap-2">
            <p className="uppercase">{t("reject")}</p>
            <X size={20} />
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-row flex-wrap gap-1">
          {game.categories.map(({ id, name }) => (
            <Badge key={id} className="text-sm">
              {name}
            </Badge>
          ))}
        </div>
        <p className="break-words p-2 text-justify italic">{game.shortDescription}</p>
        <div className="flex flex-row flex-wrap gap-1">
          <TimeBadge time={game.playingTime} />
          <PlayersBadge minPlayers={game.minPlayers} maxPlayers={game.maxPlayers} />
          <AgeBadge age={game.age} />
        </div>
      </div>
    </div>
  );
};

export default GameRequest;
