import { FC } from "react";
import { Opinion as OpinionType } from "@/types/Opinion";
import { getFullname } from "@/utils/user";
import Avatar from "./Avatar";
import Stars from "./Stars";

interface Props {
  opinion: OpinionType;
}

const Opinion: FC<Props> = ({ opinion }) => {
  return (
    <div className="flex w-full flex-row gap-3 rounded-lg bg-card p-2 ">
      <Avatar user={opinion.user} className="h-16 w-16" />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between pb-2">
          <div>{getFullname(opinion.user)}</div>
          <Stars count={3} />
        </div>
        <div className="line-clamp-2 p-2 text-xs">{opinion.description}</div>
      </div>
    </div>
  );
};

export default Opinion;
