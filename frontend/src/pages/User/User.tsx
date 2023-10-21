import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { user } from "@cypress/fixtures/user";
import Opinions from "@/components/Opinions";
import UserDetails from "@/components/UserDetails";
import { Button } from "@/components/ui/button";
import AddUserOpinionModal from "./AddUserOpinionModal";

const User: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-row gap-6">
      <div className="flex max-w-2xl flex-col items-stretch gap-6 rounded-lg">
        <div className="flex-grow rounded-lg bg-section p-4">
          <UserDetails
            onClick={() => setIsModalOpen(true)}
            user={user}
            showEdit={false}
            isLoading={false}
          />
          {isModalOpen && <AddUserOpinionModal />}
        </div>
        <div className="flex h-3/5 flex-col rounded-lg bg-section p-2">
          <Opinions />
          <Button className="m-4 ml-auto max-w-max" onClick={() => setIsModalOpen(true)}>
            {t("addOpinion")}
          </Button>
        </div>
      </div>
      <div className="flex-grow rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default User;
