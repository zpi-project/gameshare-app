import { FC } from "react";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { roleState } from "@state/role";
import LoginButton from "@components/LoginButton";
import LogoutButton from "@components/LogoutButton";

const Dashboard: FC = () => {
  const role = useRecoilValue(roleState);

  return (
    <>
      <Typography>{"Home page :)"}</Typography>
      {role === "guest" ? <LoginButton /> : <LogoutButton />}
    </>
  );
};

export default Dashboard;
