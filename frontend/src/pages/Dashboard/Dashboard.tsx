import { FC } from "react";
import { useRecoilValue } from "recoil";
import { roleState } from "@state/role";
import LoginButton from "@components/LoginButton";
import LogoutButton from "@components/LogoutButton";

const Dashboard: FC = () => {
  const role = useRecoilValue(roleState);

  return (
    <>
      <div>{"Home page :)"}</div>
      {role === "guest" ? <LoginButton /> : <LogoutButton />}
    </>
  );
};

export default Dashboard;
