import { FC } from "react";
import Opinion from "./Opinion";

interface Props {}

const Opinions: FC<Props> = () => {
  return (
    // probably some loop
    <div className="flex h-full flex-grow flex-col gap-4 rounded-lg">
      <Opinion>cerv</Opinion>
      <Opinion>dvfr</Opinion>
    </div>
  );
};

export default Opinions;
