import { FC } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@state/role";
import Api from "@api/Api";

const LoginButton: FC = () => {
  const setRole = useSetRecoilState(roleState);

  return (
    <GoogleLogin
      onSuccess={res => {
        setRole("user");
        console.log(res);
        const tokenInterceptor = Api.interceptors.request.use(config => {
          config.headers.Authorization = `Bearer ${res.credential ?? ""}`;
          return config;
        });

        return () => {
          Api.interceptors.request.eject(tokenInterceptor);
        };
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default LoginButton;
