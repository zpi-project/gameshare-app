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
        <Avatar user={{ firstname: "Aleksandra", lastname: "Serwicka" }} className="h-40 w-40" />
        <div className="h-max-h flex-grow rounded-lg bg-card p-5 text-xl">Jan Kowalski</div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="h-max-h w-6/12 rounded-lg bg-card p-2">675787780</div>
        <div className="flex w-full flex-row justify-between">
          <div className="h-max-h w-6/12 rounded-lg bg-card p-2">ul.Łąkowa 4</div>
          <Button onClick={onClick} className="w-32">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
