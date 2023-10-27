import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URLS } from "@/constants/urls";
import { UserApi } from "@/api/UserApi";
import Opinions from "@/components/Opinions";
import UserDetails from "@/components/UserDetails";
import AddOpinion from "@/components/AddOpinion";
import { useToast } from "@/components/ui/use-toast";
import AddUserOpinionModal from "./AddUserOpinionModal";

const User: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { id = "" } = useParams();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserApi.getUserByUUID(id),
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
          <UserDetails
            onClick={() => setIsModalOpen(true)}
            user={user}
            showEdit={false}
            isLoading={isLoading}
          />
          {isModalOpen && <AddUserOpinionModal />}
        </div>
        <div className="flex h-3/5 flex-col rounded-lg bg-section p-2">
          <Opinions />
          <AddOpinion />
        </div>
      </div>
      <div className="w-1/2 flex-grow rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default User;
