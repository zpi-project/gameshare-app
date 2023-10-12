import { FC } from "react";
import { useRecoilValue } from "recoil";
import { roleState } from "@state/role";
import LoginButton from "@components/LoginButton";
import LogoutButton from "@components/LogoutButton";
import {useQuery} from "@tanstack/react-query";
import Api from "@api/Api.ts";

const Dashboard: FC = () => {
  const role = useRecoilValue(roleState);
    useQuery({queryKey: ["test"], queryFn:() => Api.get("/test")});
    console.log("x");
  return (
    <>
      <div>{"Home page :)"}</div>
      {role === "guest" ? <LoginButton /> : <LogoutButton />}
    </>
  );
};

export default Dashboard;
