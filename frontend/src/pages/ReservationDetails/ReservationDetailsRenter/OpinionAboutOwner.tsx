import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Opinion } from "@/types/Opinion";
import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface OpinionAboutOwnerProps {
  ownerOpinion: Opinion | null;
  canAddOwnerOpinion: boolean;
}

const OpinionAboutOwner: FC<OpinionAboutOwnerProps> = ({ ownerOpinion, canAddOwnerOpinion }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-grow flex-col gap-4 rounded-lg bg-section p-4 pb-1">
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
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-row justify-between p-1">
            <h3 className="text-xl uppercase">{t("reservationDetails.renter.ownerOpinion")}</h3>
            <Stars count={0} />
          </div>
          <div className="flex w-full flex-row justify-between gap-1">
            <div className="flex w-full">
              <Textarea placeholder="Type your message here." id="message-2" />
            </div>
          </div>
          <div className="flex justify-end p-1.5">
            <Button className="w-40">Save opinion</Button>
          </div>
        </div>
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
