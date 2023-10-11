import { FC } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@state/token";

const LoginButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);

  return (
    <GoogleLogin
      onSuccess={res => {
        setToken(res.credential ?? null);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default LoginButton;
