import { FC } from "react";
import Avatar from "@/components/Avatar";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { roleState } from "@/state/role";
import { cn } from "@/utils/tailwind";
import { useRecoilValue } from "recoil";

interface UserItemProps {
  className?: string;
}
const UserItem: FC<UserItemProps> = ({ className = "" }) => {
  const role = useRecoilValue(roleState);

  return (
    <div className={cn("", className)}>
      <Avatar className="h-14 w-14 rounded-lg text-primary-foreground" />
      {role === "guest" ? (
        <>
          <LoginButton />
        </>
      ) : (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default UserItem;
