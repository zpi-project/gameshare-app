import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Opinion } from "@/types/Opinion";
import { Stars } from "@/components/Stars";


interface OpinionAboutOwnerProps {
  ownerOpinion: Opinion | null;
  canAddOwnerOpinion: boolean;
}

const OpinionAboutOwner: FC<OpinionAboutOwnerProps> = ({ ownerOpinion, canAddOwnerOpinion }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-grow flex-col gap-4 rounded-lg bg-section p-4">
      {ownerOpinion ? (
        <>
          <div className="flex flex-row flex-wrap justify-between gap-4">
            <h3 className="text-xl uppercase">{t("reservationDetails.renter.ownerOpinion")}</h3>
            <Stars count={ownerOpinion.stars} />
          </div>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {ownerOpinion.description}
          </p>
        </>
      ) : canAddOwnerOpinion ? (
        <div>you can add opinion about owner here</div>
      ) : (
        <>
          <h3 className="text-xl uppercase">{t("reservationDetails.renter.ownerOpinion")}</h3>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {t("cannotAddOpinionAboutOwner")}
          </p>
        </>
      )}
    </div>
  );
};

export default OpinionAboutOwner;