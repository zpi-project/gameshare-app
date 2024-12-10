import { FC } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@/state/token";

interface LoginButtonProps {
  size?: "large" | "medium" | "small";
  type?: "standard" | "icon";
}
const LoginButton: FC<LoginButtonProps> = ({ size = "large", type = "standard" }) => {
  const setToken = useSetRecoilState(tokenState);

  return (
    <GoogleLogin
      onSuccess={res => {
        if (res.credential) {
          setToken(res.credential);
        }
      }}
      width="256px"
      size={size}
      type={type}
    />
  );
};

export default LoginButton;
