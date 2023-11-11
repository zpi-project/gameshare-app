import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Opinion from "./Opinion";
import { UserApi } from "@/api/UserApi";

const Opinions: FC = () => {
  const { data: user, isLoading } = useQuery({
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
      <div className="flex flex-col gap-4 p-4">
        {opinions.map((opinion, id) => (
          <Opinion opinion={opinion} key={id} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Opinions;
