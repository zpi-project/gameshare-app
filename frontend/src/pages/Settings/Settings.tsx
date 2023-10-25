import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserApi } from "@/api/UserApi";
import Opinions from "@/components/Opinions";
import UserDetails from "@/components/UserDetails";
import EditPersonalDataModal from "./EditPersonalDataModal";
import { useToast } from "@/components/ui/use-toast";
import { URLS } from "@/constants/urls";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Settings: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    data: user,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: UserApi.getUser,
    onError: () => {
      toast({ title: t("settingsErrorTitle"), description: t("settingsErrorDescription"), variant: "destructive" });
      navigate(URLS.DASHBOARD)
    },
  });

  return (
    <div className="flex h-full flex-row gap-6">
      <div className="flex h-full w-1/2 flex-grow flex-col gap-6 rounded-lg">
        <div className="h-2/5 rounded-lg bg-section p-4">
          <UserDetails
            onClick={() => setIsModalOpen(true)}
            user={user}
            showEdit={true}
            isLoading={isLoading}
          />
          {isModalOpen && <EditPersonalDataModal />}
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
