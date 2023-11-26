import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Opinion } from "@/types/Opinion";
import { Stars } from "@/components/Stars";

interface OpinionAboutRenterProps {
  renterOpinion: Opinion | null;
  canAddRenterOpinion: boolean;
}

const OpinionAboutRenter: FC<OpinionAboutRenterProps> = ({
  renterOpinion,
  canAddRenterOpinion,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-grow flex-col gap-4 rounded-lg bg-section p-4">
      {renterOpinion ? (
        <>
          <div className="flex flex-row flex-wrap justify-between gap-4">
            <h3 className="text-xl uppercase">{t("reservationDetails.owner.renterOpinion")}</h3>
            <Stars count={renterOpinion.stars} />
          </div>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {renterOpinion.description}
          </p>
        </>
      ) : canAddRenterOpinion ? (
        <div>you can add opinion about this user here</div>
      ) : (
        <>
          <h3 className="text-xl uppercase">{t("reservationDetails.owner.renterOpinion")}</h3>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {t("cannotAddOpinionAboutRenter")}
          </p>
        </>
      )}
    </div>
  );
};

export default OpinionAboutRenter;
