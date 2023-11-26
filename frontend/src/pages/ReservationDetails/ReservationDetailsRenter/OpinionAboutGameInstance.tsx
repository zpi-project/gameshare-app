import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Opinion } from "@/types/Opinion";
import { Stars } from "@/components/Stars";

interface OpinionAboutGameIntanceProps {
  gameInstanceOpinion: Opinion | null;
  canAddGameInstanceOpinion: boolean;
}

const OpinionAboutGameIntance: FC<OpinionAboutGameIntanceProps> = ({
  gameInstanceOpinion,
  canAddGameInstanceOpinion,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-grow flex-col gap-4 rounded-lg bg-section p-4">
      {gameInstanceOpinion ? (
        <>
          <div className="flex flex-row flex-wrap justify-between gap-4">
            <h3 className="text-xl uppercase">{t("reservationDetails.renter.gameOpinion")}</h3>
            <Stars count={gameInstanceOpinion.stars} />
          </div>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {gameInstanceOpinion.description}
          </p>
        </>
      ) : canAddGameInstanceOpinion ? (
        <div>you can add opinion about this game here</div>
      ) : (
        <>
          <h3 className="text-xl uppercase">{t("reservationDetails.renter.gameOpinion")}</h3>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {t("cannotAddOpinionAboutGame")}
          </p>
        </>
      )}
    </div>
  );
};

export default OpinionAboutGameIntance;
