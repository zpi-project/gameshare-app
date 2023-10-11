import { FC } from "react";
import { googleLogout } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@state/token";

const LogoutButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);

  const logout = () => {
    googleLogout();
    setToken(null);
  };

  return <button onClick={logout}>Log out</button>;
};

export default LogoutButton;
