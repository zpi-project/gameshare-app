import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { OpinionApi } from "@/api/OpinionApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import Opinion from "./Opinion";

const Opinions: FC = () => {
  const { t } = useTranslation();
  const { data: opinions, isLoading } = useQuery({
    queryKey: ["opinions"],
    queryFn: () => OpinionApi.getAll(0,100),
  });

  return (
    <ScrollArea>
      <div className="flex h-full flex-col gap-4 p-4">
        {opinions?.results.map((opinion, id) => (
          <Opinion opinion={opinion} key={id} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Opinions;
