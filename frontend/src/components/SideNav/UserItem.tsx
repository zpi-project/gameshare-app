import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { cn } from "@/utils/tailwind";
import Avatar from "@/components/Avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "../ui/button";
import LanguageToggle from "./LanguageToggle";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./ModeToggle";

interface UserItemProps {
  className?: string;
}
const UserItem: FC<UserItemProps> = ({ className = "" }) => {
  const role = useRecoilValue(roleState);
  const match = useMatch(URLS.SETTINGS);
  const { t } = useTranslation();
  const token = useRecoilValue(tokenState);

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          className={cn(
            "h-12 w-12 rounded-lg transition-all duration-300 hover:bg-muted",
            className,
          )}
          iconClassName={match !== null ? "bg-primary" : ""}
        />
      </PopoverTrigger>
      <PopoverContent side="right" align="end" className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="h-10 flex-grow rounded-lg bg-primary p-2 font-medium">{t("mode")}:</div>
          <ModeToggle />
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="h-10 flex-grow rounded-lg bg-primary p-2 font-medium">
            {t("language")}:
          </div>
          <LanguageToggle />
        </div>
        {!token && <LoginButton />}
        {role !== "guest" && (
          <Link to={URLS.SETTINGS}>
            <Button className="w-full">{t("myProfile")}</Button>
          </Link>
        )}
        {token && <LogoutButton />}
      </PopoverContent>
    </Popover>
  );
};

export default UserItem;
