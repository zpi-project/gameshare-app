import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { UserApi } from "@/api/UserApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import Opinion from "./Opinion";

const Opinions: FC = () => {
  const { t } = useTranslation();
  const { data: opinions, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: UserApi.get,
    onError: () => {
      toast({
        title: t("settingsErrorTitle"),
        description: t("settingsErrorDescription"),
        variant: "destructive",
      });
      navigate(URLS.DASHBOARD);
    },
  });

  return (
    <ScrollArea>
      <div className="flex h-full flex-col gap-4 p-4">
        {opinions.map((opinion, id) => (
          <Opinion opinion={opinion} key={id} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Opinions;
