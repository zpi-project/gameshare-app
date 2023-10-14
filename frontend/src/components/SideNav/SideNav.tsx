import { FC } from "react";
import { useRecoilValue } from "recoil";
import { roleState } from "@state/role";
import LoginButton from "@components/LoginButton";
import LogoutButton from "@components/LogoutButton";

const SideNav: FC = () => {
  const role = useRecoilValue(roleState);
  return (
    <div className="flex h-full flex-col rounded-lg bg-section px-3 py-4 text-section-foreground">
      {role === "guest" ? <LoginButton /> : <LogoutButton />}
    </div>
  );
};

export default SideNav;
