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
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden xl:h-full xl:flex-row xl:gap-6">
      <div className="flex flex-grow flex-col gap-2 rounded-lg xl:h-full xl:w-1/2 xl:gap-6">
        <div className="h-[200px] rounded-lg bg-section p-4 xl:h-[365px]">
          <UserDetails user={user} isLoading={isLoading} />
        </div>
        <div className="flex max-h-[150px] rounded-lg  bg-section xl:h-[calc(100%-389px)] xl:max-h-[calc(100%-389px)]">
          <Opinions />
        </div>
      </div>
      <div className="h-[calc(100%-350px)] flex-grow rounded-lg bg-section p-4 xl:h-full xl:w-1/2">
        <GameInstancesSection owner={user} />
      </div>
    </div>
  );
};

export default UserProfile;
