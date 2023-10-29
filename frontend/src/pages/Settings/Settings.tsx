import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { UserApi } from "@/api/UserApi";
import Opinions from "@/components/Opinions";
import UserDetails from "@/components/UserDetails";
import { useToast } from "@/components/ui/use-toast";

const Settings: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

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
    <div className="flex h-full flex-row gap-6">
      <div className="flex h-full w-1/2 flex-grow flex-col gap-6 rounded-lg">
        <div className="h-2/5 rounded-lg bg-section p-4">
          <UserDetails user={user} showEdit={true} isLoading={isLoading} />
        </div>
        <div className="flex h-3/5 rounded-lg bg-section">
          <Opinions />
        </div>
      </div>
      <div className="w-1/2 flex-grow rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default Settings;
