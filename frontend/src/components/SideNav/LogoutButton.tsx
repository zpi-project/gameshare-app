import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { googleLogout } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { Button } from "@/components/ui/button";

const LogoutButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);
  const setRole = useSetRecoilState(roleState);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logout = () => {
    googleLogout();
    setToken(null);
    secureLocalStorage.removeItem("token");
    setRole("guest");
    navigate(URLS.DASHBOARD);
  };

  return (
    <Button onClick={logout} variant="outline">
      {t("logout")}
    </Button>
  );
};

export default LogoutButton;
