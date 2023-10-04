import { FC } from "react";
import { Button } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@state/role";

const LogoutButton: FC = () => {
  const setRole = useSetRecoilState(roleState);

  const logout = () => {
    googleLogout();
    setRole("guest");
  };

  return <Button onClick={logout}>Log out</Button>;
};

export default LogoutButton;
