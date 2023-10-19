import { FC } from "react";
import { LOREM } from "@/constants/lorem";
import { ScrollArea } from "@/components/ui/scroll-area";
import Opinion from "./Opinion";

const Opinions: FC = () => {
  return (
    // probably some loop
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-4 p-4">
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
            stars: 1,
            user: { firstname: "Aleksandra", lastname: "Serwicka" },
          }}
        />
        <Opinion
          opinion={{
            description: LOREM,
            stars: 5,
            user: { firstname: "Aleksandra", lastname: "Serwicka" },
          }}
        />
        <Opinion
          opinion={{
            description: LOREM,
            stars: 4,
            user: { firstname: "Aleksandra", lastname: "Serwicka" },
          }}
        />
        <Opinion
          opinion={{
            description: LOREM,
            stars: 2,
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
      </div>
    </ScrollArea>
  );
};

export default Opinions;
