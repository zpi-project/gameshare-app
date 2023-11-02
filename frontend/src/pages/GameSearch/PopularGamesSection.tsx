import { FC } from "react";
import { useTranslation } from "react-i18next";

const PopularGamesSection: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <h2 className="text-3xl leading-loose text-primary">{t("popularNow")}</h2>
    </div>
  );
};

export default PopularGamesSection;
