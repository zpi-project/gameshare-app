import { FC } from "react";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { cn } from "@/utils/tailwind";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";

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
