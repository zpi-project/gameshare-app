import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import { Button } from "@/components/ui/button";

interface GameDetailsSectionProps {
  gameInstance: GameInstanceDetails;
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
      <Button className="absolute bottom-5 left-5 px-8" onClick={redirectGamePage}>
        {t("seeGamePage")}
      </Button>
      <Button className="absolute bottom-5 right-5 px-8">{t("seeAvailability")}</Button>
    </div>
  );
};

export default GameInstanceDetailsSection;
