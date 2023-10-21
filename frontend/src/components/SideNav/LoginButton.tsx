import { FC } from "react";
import secureLocalStorage from "react-secure-storage";
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
          secureLocalStorage.setItem("token", res.credential);
        }
      }}
      width="256px"
    />
  );
};

export default LoginButton;
