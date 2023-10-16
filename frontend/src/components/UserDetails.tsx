import { FC } from "react";
import Avatar from "./Avatar";
import { Button } from "./ui/button";

interface Props {
  onClick?: () => void;
}

const UserDetails: FC<Props> = ({ onClick }) => {
  return (
    <div className="w-fullgap-6 flex h-full flex-col">
      <div className="flex w-full flex-row gap-6">
        <Avatar></Avatar>
        <div className="rounded-lg bg-card">Jan Kowalski</div>
        <Button onClick={onClick}>Edit</Button>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="rounded-lg bg-card">675787780</div>
        <div className="rounded-lg bg-card">ul.Łąkowa 4</div>
      </div>
    </div>
  );
};

export default UserDetails;
