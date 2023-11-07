import { FC } from "react";
import { useTranslation } from "react-i18next";

const GameUsersSection: FC = () => {

  const { t } = useTranslation();

  return <div>
    <h3 className="text-xl text-primary font-bold">{t("usersWithThisGame")}</h3>
  </div>;
};

export default GameUsersSection;
