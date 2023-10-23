import { FC } from "react";
import { useTranslation } from "react-i18next";
import secureLocalStorage from "react-secure-storage";
import { googleLogout } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@/state/token";
import { Button } from "@/components/ui/button";

const LogoutButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);
  const { t } = useTranslation();
  const logout = () => {
    googleLogout();
    setToken(null);
    secureLocalStorage.removeItem("token");
  };

  return (
    <Button onClick={logout} variant="outline">
      {t("logout")}
    </Button>
  );
};

export default LogoutButton;
