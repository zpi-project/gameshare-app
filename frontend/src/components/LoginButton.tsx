import { FC } from "react";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { GoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";

const LoginButton: FC = () => {
  const setToken = useSetRecoilState(tokenState);
  const setRole = useSetRecoilState(roleState);

  return (
    <GoogleLogin
      onSuccess={res => {
        if (res.credential) {
          setRole("user");
          setToken(res.credential);
        }
        setToken(res.credential ?? null);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default LoginButton;
