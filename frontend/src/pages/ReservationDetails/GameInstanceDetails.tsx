import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GameInstanceDetails as GameInstanceDetailsType } from "@/types/GameInstance";
import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";

interface GameInstanceDetailsProps {
  gameInstance: GameInstanceDetailsType;
}

const GameInstanceDetails: FC<GameInstanceDetailsProps> = ({
  gameInstance: {
    game: { image, name },
    description,
    avgRating,
    opinionsAmount,
    pricePerDay,
    images,
  },
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl uppercase">{t("gameDetails")}</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap justify-between">
          <p className="text-lg font-semibold">{name}</p>
          <PriceBadge price={pricePerDay} />
        </div>
        <div className="flex flex-row gap-4">
          <div className="h-[190px] w-[190px] min-w-[190px] flex-grow overflow-hidden rounded-lg bg-section">
            <img
              src={images.length ? images[0].link : image}
              alt={name}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <div className="ml-auto flex flex-row gap-2">
              {avgRating > 0 ? (
                <>
                  <p className="text-lg tracking-widest text-foreground">({opinionsAmount})</p>
                  <Stars count={Math.round(avgRating)} variant="secondary" />
                </>
              ) : (
                <Badge variant="secondary" className="w-max px-3 py-1">
                  {t("noOpinions")}
                </Badge>
              )}
            </div>
            <p className="line-clamp-6 break-all italic">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInstanceDetails;
