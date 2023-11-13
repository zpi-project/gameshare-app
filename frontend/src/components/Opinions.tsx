import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { OpinionApi } from "@/api/OpinionApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Opinion from "./Opinion";

const Opinions: FC = () => {
  const { data: opinions, isLoading } = useQuery({
    queryKey: ["opinions"],
    queryFn: () => OpinionApi.getAll(0, 100),
  });

  return (
    <ScrollArea className="w-full">
      <div className="flex h-full w-full flex-col gap-4 p-4">
        {isLoading && <Skeleton className="h-max-h flex-grow rounded-lg p-5" />}
        {opinions && opinions?.results.map((opinion, id) => <Opinion opinion={opinion} key={id} />)}
      </div>
    </ScrollArea>
  );
};

export default Opinions;
