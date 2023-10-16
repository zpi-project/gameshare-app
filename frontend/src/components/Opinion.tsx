import { FC } from "react";
import Avatar from "./Avatar";

interface Props {}

const Opinion: FC<Props> = () => {
  return (
    <div className="w-fullgap-6 flex max-h-28 flex-row rounded-lg bg-card p-3">
      <Avatar user={{ firstname: "Aleksandra", lastname: "Serwicka" }} className="h-16 w-16" />
      <div className="scrollbar-hide overflow-auto p-2 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut velit ac felis lacinia
        aliquam. Nulla ut tempus metus. Aenean blandit, ligula sed commodo convallis, odio sapien
        convallis neque, et convallis purus lorem a neque. Pellentesque lacinia pulvinar libero
        dapibus rhoncus. Duis dapibus vel tellus eu convallis. Pellentesque ac erat quis elit
        venenatis laoreet at nec sem.
      </div>
    </div>
  );
};

export default Opinion;
