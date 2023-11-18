import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import PriceBadge from "@/components/Badge/PriceBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GameDetailsSectionProps {
  gameInstance: GameInstanceDetails;
  color: string;
}

const GameInstanceDetailsSection: FC<GameDetailsSectionProps> = ({ gameInstance }) => {
  const { t } = useTranslation();

  let navigate = useNavigate();
  const redirectGamePage = () => {
    let path = `${URLS.GAMES}/${gameInstance.game.id}`;
    navigate(path);
  };

  return (
    <div className="flex h-full w-full flex-col gap-3  px-4">
      <Tabs defaultValue="default" className="flex w-full flex-row gap-3 pt-6">
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
                <TabsTrigger value={image.link} className="bg-transparent focus:outline-none">
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
              <TabsContent value={image.link} className="h-96 w-96 overflow-hidden rounded-lg">
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
          <div className="flex flex-col items-end p-3">
            <PriceBadge price={gameInstance.pricePerDay} />
            {!gameInstance.active && (
              <div className="text-destructive text-xl uppercase">{t("deactivated")}</div>
            )}
          </div>
        </div>
        <p className="px-2 italic xl:text-lg 2xl:w-3/4">{gameInstance.description}</p>
      </div>
      <Button className="absolute bottom-5 left-5 px-8" onClick={redirectGamePage}>
        {t("seeGamePage")}
      </Button>
      <Button className="absolute bottom-5 right-5 px-8">{t("seeAvailability")}</Button>
    </div>
  );
};

export default GameInstanceDetailsSection;
