import { FC } from "react";
import { useRecoilValue } from "recoil";
import { roleState } from "@state/role";
import LoginButton from "@components/LoginButton";
import LogoutButton from "@components/LogoutButton";
import Api from "@api/Api";
import { useQuery } from "@tanstack/react-query";

const Dashboard: FC = () => {
  const role = useRecoilValue(roleState);

  const x = useQuery({
    queryKey: ["a"],
    queryFn: () => Api.get("/test"),
  });

  const y = useQuery({
    queryKey: ["b"],
    queryFn: () => Api.get("/auth"),
  });

  return (
    <>
      <div>{"Home page :)"}</div>
      {role === "guest" ? <LoginButton /> : <LogoutButton />}
    </>
  );
};

export default Dashboard;
