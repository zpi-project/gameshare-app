import { FC } from "react";
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
    <div className={cn("", className)}>{role === "guest" ? <LoginButton /> : <LogoutButton />}</div>
  );
};

export default UserItem;
