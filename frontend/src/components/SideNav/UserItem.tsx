import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import { cn } from "@/utils/tailwind";
import Avatar from "@/components/Avatar";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";

interface UserItemProps {
  className?: string;
}
const UserItem: FC<UserItemProps> = ({ className = "" }) => {
  const role = useRecoilValue(roleState);
  const match = useMatch(URLS.SETTINGS);
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          className={cn(
            "h-14 w-14 rounded-lg transition-all duration-300 hover:bg-muted",
            className,
          )}
          iconClassName={match !== null ? "bg-primary" : ""}
        />
      </PopoverTrigger>
      <PopoverContent side="right" align="end" className="flex flex-col gap-3">
        {role === "guest" ? (
          <LoginButton />
        ) : (
          <>
            <LogoutButton />
            <Link to={URLS.SETTINGS}>
              <Button className="w-full">{t("settings")}</Button>
            </Link>
          </>
        )}
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="h-10 flex-grow rounded-lg bg-background p-2">{t("theme")}:</div>
          <ModeToggle />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserItem;
