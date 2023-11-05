import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { GameInstance as GameInstanceType } from "@/types/GameInstance";
import Stars from "./Stars";
import { Button } from "./ui/button";

interface Props {
  gameInstance: GameInstanceType;
}

const GameInstance: FC<Props> = ({ gameInstance }) => {
  const [showAll, setshowAll] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setshowAll(current => !current);
  };

  return (
    <div className="flex flex-row">
      <div className="flex w-full flex-row items-center gap-3 rounded-lg bg-card p-4">
        <img src={gameInstance.photoLink} className="h-32 w-32" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div className="text-primary">{gameInstance.title}</div>
            <Stars count={3} />
          </div>
          <div className="min-h-8 pr-2 text-xs italic">
            {showAll ? (
              gameInstance.description
            ) : (
              <>
                {gameInstance.description.slice(0, 400)}
                {gameInstance.description.length > 400 && (
                  <>
                    <span>... </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between px-2 py-2.5">
        <Button className="h-16 w-14 bg-card">
          <Pencil />
        </Button>
        <Button className="h-16 w-14 bg-card">
          <CalendarDays />
        </Button>
      </div>
    </div>
  );
};

export default GameInstance;
