import { FC, useState } from "react";
import Opinions from "@/components/Opinions";
import UserDetails from "@/components/UserDetails";
import EditPersonalDataModal from "./EditPersonalDataModal";

const Settings: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex h-full flex-row gap-6">
      <div className="flex h-full max-w-2xl flex-grow flex-col gap-6 rounded-lg">
        <div className="min-h-[330px] rounded-lg bg-section p-4">
          <UserDetails
            onClick={() => setIsModalOpen(true)}
            user={{ firstname: "Aleksandra", lastname: "Serwicka" }}
          />
          {isModalOpen && <EditPersonalDataModal />}
        </div>
        <div className="flex rounded-lg bg-section">
          <Opinions />
        </div>
      </div>
      <div className="flex-grow rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default Settings;
