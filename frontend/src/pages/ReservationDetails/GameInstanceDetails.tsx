import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";
import { GameInstanceDetails } from "@/types/GameInstance";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface GameInstanceDetailsProps {
  gameInstance: GameInstanceDetails;
}

const GameInstanceDetails: FC<GameInstanceDetailsProps> = ({ gameInstance: { game: { name, image }, images, pricePerDay, avgRating, description } }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="uppercase text-xl">{t("gameDetails")}</h3>
      <div className="flex flex-col gap-4">
        <p className="flex flex-row justify-between flex-wrap">
          <h4 className="text-lg font-semibold">{name}</h4>
          <PriceBadge price={pricePerDay} />
        </p>
        <div className="flex flex-row gap-4">
          <div className="h-[190px] min-w-[190px] w-[190px] overflow-hidden rounded-lg bg-section flex-grow">
            <img src={images.length ? images[0].link : image} alt={name} className="h-full w-full object-cover object-top" />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <div className="ml-auto">
              {avgRating > 0 ? <Stars count={Math.round(avgRating)} variant="secondary" /> : <Badge variant="secondary">{t("gameNoOpinions")}</Badge>}
            </div>
            <p className="break-words italic line-clamp-6">
              {description}
             
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInstanceDetails;
