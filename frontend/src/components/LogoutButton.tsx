import { FC } from "react";
import { googleLogout } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@state/role";
import { tokenState } from "@state/token";

const LogoutButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);
  const setRole = useSetRecoilState(roleState);

  const logout = () => {
    googleLogout();
    setToken(null);
    setRole("guest");
  };

  return <button onClick={logout}>Log out</button>;
};

export default LogoutButton;
