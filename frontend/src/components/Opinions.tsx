import { FC } from "react";
import Opinion from "./Opinion";
import {LOREM} from "@/constants/lorem"
import { ScrollArea } from "@/components/ui/scroll-area"


interface Props {}

const Opinions: FC<Props> = () => {
  return (
    // probably some loop
    <ScrollArea className="flex-col h-[270px] rounded-md gap-4">
      <Opinion opinion={{description:LOREM, stars:3, user:{ firstname: "Aleksandra", lastname: "Serwicka" }}}/>
      <Opinion opinion={{description:LOREM, stars:3, user:{ firstname: "Aleksandra", lastname: "Serwicka" }}}/>
      <Opinion opinion={{description:LOREM, stars:3, user:{ firstname: "Aleksandra", lastname: "Serwicka" }}}/>
      <Opinion opinion={{description:LOREM, stars:3, user:{ firstname: "Aleksandra", lastname: "Serwicka" }}}/>
    </ScrollArea>
  );
};

export default Opinions;
