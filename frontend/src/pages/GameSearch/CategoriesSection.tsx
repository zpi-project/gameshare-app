import { FC } from "react";
import { useTranslation } from "react-i18next";

const CategoriesSection: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-3xl leading-loose text-primary">{t("seeAll")}</h2>
    </div>
  );
};

export default CategoriesSection;
