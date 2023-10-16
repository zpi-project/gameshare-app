import { FC } from "react";
import Avatar from "./Avatar";

interface Props {}

const Opinion: FC<Props> = () => {
  return (
    <div className="w-fullgap-6 flex h-full flex-row">
      <Avatar></Avatar>
    </div>
  );
};

export default Opinion;
