import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { UserApi } from "@/api/UserApi";
import GameInstancesSection from "@/components/GameInstancesSection";
import Opinions from "@/components/Opinions";
import UserDetails from "@/components/UserDetails";
import { useToast } from "@/components/ui/use-toast";

const UserProfile: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id = "" } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserApi.getByUUID(id),
    onError: () => {
      toast({
        title: t("userErrorTitle"),
        description: t("userErrorDescription"),
        variant: "destructive",
      });
      navigate(URLS.DASHBOARD);
    },
  });

  return (
    <div className="flex h-full flex-row gap-6">
      <div className="flex w-1/2 flex-col items-stretch gap-6 rounded-lg">
        <div className="flex-grow rounded-lg bg-section p-4">
          <UserDetails user={user} showEdit={false} isLoading={isLoading} />
        </div>
        <div className="flex h-3/5 flex-col rounded-lg bg-section p-2">
          <Opinions />
        </div>
      </div>
      <div className="w-1/2 flex-grow rounded-lg bg-section p-4">
        <div className="flex h-full rounded-lg bg-section">
          <GameInstancesSection owner={user} showButtons={false} isMyPage={false} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
