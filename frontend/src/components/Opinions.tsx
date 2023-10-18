import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LOREM } from "@/constants/lorem";
import Opinion from "./Opinion";

const Opinions: FC = () => {
  return (
    // probably some loop
    <ScrollArea className="h-[270px] flex-col gap-4 rounded-md">
      <Opinion
        opinion={{
          description: LOREM,
          stars: 3,
          user: { firstname: "Aleksandra", lastname: "Serwicka" },
        }}
      />
      <Opinion
        opinion={{
          description: LOREM,
          stars: 3,
          user: { firstname: "Aleksandra", lastname: "Serwicka" },
        }}
      />
      <Opinion
        opinion={{
          description: LOREM,
          stars: 3,
          user: { firstname: "Aleksandra", lastname: "Serwicka" },
        }}
      />
      <Opinion
        opinion={{
          description: LOREM,
          stars: 3,
          user: { firstname: "Aleksandra", lastname: "Serwicka" },
        }}
      />
    </ScrollArea>
  );
};

export default Opinions;
