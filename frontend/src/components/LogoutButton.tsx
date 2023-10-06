import { FC } from "react";
import { googleLogout } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@state/role";
import Api from "@api/Api";

const LogoutButton: FC = () => {
  const setRole = useSetRecoilState(roleState);

  const logout = () => {
    const tokenInterceptor = Api.interceptors.request.use(config => {
      delete config.headers.Authorization;
      return config;
    });
    googleLogout();
    setRole("guest");

    return () => {
      Api.interceptors.request.eject(tokenInterceptor);
    };
  };

  return <button onClick={logout}>Log out</button>;
};

export default LogoutButton;
