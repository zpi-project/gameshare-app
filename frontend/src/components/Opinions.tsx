import { FC } from "react";
import { opinions } from "@cypress/fixtures/opinion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Opinion from "./Opinion";

const Opinions: FC = () => {
  return (
    <ScrollArea>
      <div className="flex flex-col gap-4 p-4">
        {opinions.map((opinion, id) => (
          <Opinion opinion={opinion} key={id} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Opinions;
