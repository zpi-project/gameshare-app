import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useMatch } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import { User } from "@/types/User";
import { cn } from "@/utils/tailwind";
import Avatar from "@/components/Avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";

interface UserItemProps {
  user: User;
  className?: string;
}

const UserItem: FC<UserItemProps> = ({ user, className = "" }) => {
  const role = useRecoilValue(roleState);
  const match = useMatch(URLS.MY_PROFILE);
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger data-test="avatar-button" asChild>
        <Button
          className="flex items-center gap-1 border border-[#428ccd] bg-secondary/40 px-2 dark:bg-secondary/60"
          variant="secondary"
        >
          <Avatar
            user={user}
            className={cn(
              `mr-2 h-8 w-8 rounded-full p-0 transition-all duration-300 ${
                match !== null ? "bg-primary" : ""
              }`,
              className,
            )}
            avatarImageClassName="rounded-lg"
          />
          <span className="pr-2">{user.firstName}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-[250px] flex-col bg-section">
        {role !== "guest" && (
          <>
            <Link to={URLS.MY_PROFILE} data-test="link-to-profile">
              <Button className="w-full justify-start" variant="ghost">
                <span>{t("myProfile")}</span>
              </Button>
            </Link>
            <Link to={URLS.MY_RESERVATIONS} data-test="link-to-profile">
              <Button className="w-full justify-start" variant="ghost">
                <span>{t("myReservations")}</span>
              </Button>
            </Link>
          </>
        )}
        {role === "admin" && (
          <Link to={URLS.GAME_REQUESTS} data-test="link-to-profile">
            <Button className="w-full justify-start" variant="ghost">
              <span>{t("adminPanel")}</span>
            </Button>
          </Link>
        )}
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
};
export default UserItem;
