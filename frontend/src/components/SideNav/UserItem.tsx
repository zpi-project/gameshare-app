import { FC } from "react";
import { Link, useMatch } from "react-router-dom";
import Avatar from "@/components/Avatar";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { URLS } from "@/constants/urls";
import { roleState } from "@/state/role";
import { cn } from "@/utils/tailwind";
import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";

interface UserItemProps {
  className?: string;
}
const UserItem: FC<UserItemProps> = ({ className = "" }) => {
  const role = useRecoilValue(roleState);
  const match = useMatch(URLS.SETTINGS);

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
      <PopoverContent side="right">
        {role === "guest" ? (
          <>
            <LoginButton />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <LogoutButton />
              <Link to={URLS.SETTINGS}>
                <Button className="w-full">settings</Button>
              </Link>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UserItem;
