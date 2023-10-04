import { FC } from "react";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@state/role";
import Api from "@api/Api";

const LoginButton: FC = () => {
  const setRole = useSetRecoilState(roleState);

  const login = useGoogleLogin({
    onSuccess: res => {
      setRole("user");
      const tokenInterceptor = Api.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${res.access_token}`;
        return config;
      });

      return () => {
        Api.interceptors.request.eject(tokenInterceptor);
      };
    },
  });

  return <Button onClick={() => void login()}>Log in</Button>;
};

export default LoginButton;
