import { FC, useState } from "react";
import { Opinion as OpinionType } from "@/types/Opinion";
import { getFullname } from "@/utils/user";
import Avatar from "./Avatar";
import Stars from "./Stars";

interface Props {
  opinion: OpinionType;
}

const Opinion: FC<Props> = ({ opinion }) => {
  const [showAll, setshowAll] = useState(false);

  const handleClick = () => {
    // 👇️ toggle isActive state on click
    setshowAll(current => !current);
  };

  return (
    <div className="flex w-full flex-row items-center gap-3 rounded-lg bg-card p-4">
      <Avatar user={opinion.user} className="h-16 w-16" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="text-primary">{getFullname(opinion.user)}</div>
          <Stars count={opinion.stars} />
        </div>
        <div
          className={
            showAll
              ? "min-h-8 line-clamp-none h-fit pr-2 text-xs italic"
              : "min-h-8 line-clamp-2 pr-2 text-xs italic"
          }
          onClick={handleClick}
        >
          {opinion.description}
        </div>
      </div>
    </div>
  );
};

export default Opinion;
