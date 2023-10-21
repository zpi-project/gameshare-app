import { FC } from "react";
import secureLocalStorage from "react-secure-storage";
import { GoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";

const LoginButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);
  const setRole = useSetRecoilState(roleState);

  return (
    <GoogleLogin
      onSuccess={res => {
        if (res.credential) {
          setRole("user");
          setToken(res.credential);
          secureLocalStorage.setItem("token", res.credential);
        }
        // setToken(res.credential ?? null);
      }}
      width="256px"
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default LoginButton;
