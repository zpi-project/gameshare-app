import { FC } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { AlignLeft } from "lucide-react";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { UserApi } from "@/api/UserApi";
import { Button } from "../ui/button";
import LanguageToggle from "./LanguageToggle";
import LoginButton from "./LoginButton";
import { ModeToggle } from "./ModeToggle";
import UserItem from "./UserItem";

const TopNav: FC = () => {
  const role = useRecoilValue(roleState);
  const token = useRecoilValue(tokenState);

  const { data: user } = useQuery({
    queryKey: ["user", { token }],
    queryFn: UserApi.get,
    enabled: role !== "guest",
  });

  return (
    <div className="my-2 flex">
      <div className="flex items-center gap-3">
        <Link to={URLS.DASHBOARD}>
          <img src="/logo.png" className="h-12 w-12 rounded-lg" alt="GameShare logo" />
        </Link>
        <Link to={URLS.GAMES}>
          <Button
            className="flex items-center gap-2 border border-primary px-2 text-primary hover:bg-primary"
            variant="ghost"
          >
            <AlignLeft size={20} strokeWidth={1} />
            <span>{t("catalog")}</span>
          </Button>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <UserItem user={user} />
        ) : (
          <div className="overflow-hidden rounded-sm border border-[#428ccd] stroke-2">
            <LoginButton />
          </div>
        )}
        <ModeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
};
export default TopNav;
