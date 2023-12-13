import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import PriceBadge from "@/components/Badge/PriceBadge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCalendar from "./GameCalendar";

interface GameDetailsSectionProps {
  gameInstance: GameInstanceDetails;
  color: string;
}

const GameInstanceDetailsSection: FC<GameDetailsSectionProps> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full w-full flex-col gap-3">
      <Tabs defaultValue="default" className="flex w-full flex-row gap-3">
        <TabsList className="flex h-full flex-col justify-center rounded-lg bg-transparent focus:outline-none">
          {gameInstance.images.length ? (
            <>
              <TabsTrigger value="default" className="bg-transparent focus:outline-none">
                <img
                  src={gameInstance.game.image}
                  alt={gameInstance.game.name}
                  className=" h-24 w-24 overflow-hidden rounded-lg object-cover"
                />
              </TabsTrigger>
              {gameInstance.images.map(image => (
                <TabsTrigger
                  value={image.link}
                  className="bg-transparent focus:outline-none"
                  key={image.name}
                >
                  <img
                    src={image.link}
                    alt={image.name}
                    className=" h-24 w-24 overflow-hidden rounded-lg object-cover"
                  />
                </TabsTrigger>
              ))}
            </>
          ) : (
            <TabsTrigger value="default" className="bg-transparent focus:outline-none">
              <img
                src={gameInstance.game.image}
                alt={gameInstance.game.name}
                className=" h-24 w-24 overflow-hidden rounded-lg object-cover"
              />
            </TabsTrigger>
          )}
        </TabsList>
        {gameInstance.images.length ? (
          <>
            <TabsContent value="default" className="h-96 w-96 overflow-hidden rounded-lg">
              <img
                src={gameInstance.game.image}
                alt={gameInstance.game.name}
                className="h-full w-full object-cover object-top"
              />
            </TabsContent>
            {gameInstance.images.map(image => (
              <TabsContent
                value={image.link}
                className="h-96 w-96 overflow-hidden rounded-lg"
                key={image.name}
              >
                <img
                  src={image.link}
                  alt={image.name}
                  className="h-full w-full object-cover object-top"
                />
              </TabsContent>
            ))}
          </>
        ) : (
          <TabsContent value="default" className="h-96 w-96 overflow-hidden rounded-lg">
            <img
              src={gameInstance.game.image}
              alt={gameInstance.game.name}
              className="h-full w-full object-cover object-top"
            />
          </TabsContent>
        )}
      </Tabs>
      <div className="flex flex-col gap-2  lg:gap-4">
        <div className="flex w-full flex-row justify-between">
          <h1 className="p-2 text-xl font-bold xl:text-3xl">{gameInstance.game.name}</h1>
          <div className="flex flex-col items-end gap-2 p-3">
            <PriceBadge price={gameInstance.pricePerDay} />
            {gameInstance.opinionsAmount > 0 ? (
              <div className="flex flex-row gap-2">
                <p className="text-base tracking-widest text-foreground">
                  ({gameInstance.opinionsAmount})
                </p>
                <Stars count={Math.round(gameInstance.avgRating)} variant="secondary" />
              </div>
            ) : (
              <Badge variant="secondary" className="w-max px-3 py-1">
                {t("noOpinions")}
              </Badge>
            )}
            {!gameInstance.active && (
              <Badge variant="destructive" className="uppercase">
                {t("deactivated")}
              </Badge>
            )}
          </div>
        </div>
        <p className="break-all px-2 italic xl:text-lg 2xl:w-3/4">{gameInstance.description}</p>
      </div>
      <div className="mt-auto flex flex-row flex-wrap justify-between gap-2">
        <Button
          onClick={() => navigate(`${URLS.GAMES}/${gameInstance.game.id}`)}
          className="flex-grow"
        >
          {t("seeGamePage")}
        </Button>
        <Dialog>
          <DialogTrigger asChild className="flex-grow">
            <Button>{t("seeAvailability")}</Button>
          </DialogTrigger>
          <GameCalendar gameInstance={gameInstance} />
        </Dialog>
      </div>
    </div>
  );
};

export default GameInstanceDetailsSection;
