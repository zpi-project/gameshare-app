import { FC } from "react";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { roleState } from "@state/role";

const LoginButton: FC = () => {
  const setRole = useSetRecoilState(roleState);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setRole("user");
      console.log(tokenResponse);
    },
  });

  return <Button onClick={() => void login()}>log in with google</Button>;
};

export default LoginButton;
