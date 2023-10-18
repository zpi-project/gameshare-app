import { FC } from "react";
import Avatar from "./Avatar";
import { Opinion } from "@/types/Opinion";
import { getFullname } from "@/utils/user";
import Stars from "./Stars";

interface Props {
  opinion: Opinion;
}

const Opinion: FC<Props> = ({ opinion }) => {
  return (
    <div className="w-full gap-3 flex flex-row rounded-lg bg-card p-2 ">
      <Avatar user={opinion.user} className="h-16 w-16" />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between pb-2">
          <div>{getFullname(opinion.user)}</div>
          <Stars count={3}/>
        </div>
        <div className="line-clamp-2 p-2 text-xs">
          {opinion.description}
        </div>
      </div>
      
    </div>
  );
};

export default Opinion;
