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
    },
  });

  return <Button onClick={() => void login()}>Log in</Button>;
};

export default LoginButton;
