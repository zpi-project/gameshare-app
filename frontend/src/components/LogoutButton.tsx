import { FC } from "react";
import { Button } from "@/components/ui/button";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { googleLogout } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";

const LogoutButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);
  const setRole = useSetRecoilState(roleState);

  const logout = () => {
    googleLogout();
    setToken(null);
    setRole("guest");
  };

  return <Button onClick={logout}>logout</Button>;
};

export default LogoutButton;
