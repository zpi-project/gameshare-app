import { FC } from "react";
import Avatar from "./Avatar";
import { Button } from "./ui/button";

interface Props {
  onClick?: () => void;
}

const UserDetails: FC<Props> = ({ onClick }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-row items-center gap-6">
        <Avatar user={{ firstname: "Aleksandra", lastname: "Serwicka" }} className="h-32 w-32" />
        <div className="h-max-h flex-grow rounded-lg bg-card p-5 text-xl">Jan Kowalski</div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="rounded-lg bg-card">675787780</div>
        <div className="rounded-lg bg-card">ul.Łąkowa 4</div>
        <Button onClick={onClick}>Edit</Button>
      </div>
    </div>
  );
};

export default UserDetails;
