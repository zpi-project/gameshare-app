import { FC } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@/state/token";

const LoginButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);

  return (
    <GoogleLogin
      onSuccess={res => {
        if (res.credential) {
          setToken(res.credential);
        }
      }}
      width="256px"
      data-test="login-button"
    />
  );
};

export default LoginButton;
