import { FC, useState } from "react";
import Opinions from "@/components/Opinions";
import UserDetails from "@/components/UserDetails";
import { Button } from "@/components/ui/button";
import AddUserOpinionModal from "./AddUserOpinionModal";

const User: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex h-full flex-row gap-6">
      <div className="flex h-full max-w-2xl flex-grow flex-col gap-6 rounded-lg">
        <div className="h-80 rounded-lg bg-section p-4">
          <UserDetails
            onClick={() => setIsModalOpen(true)}
            user={{ firstname: "Aleksandra", lastname: "Serwicka" }}
            showEdit={false}
          />
          {isModalOpen && <AddUserOpinionModal />}
        </div>
        <div className="flex h-80 flex-col rounded-lg bg-section p-2">
          <Opinions />
          <div className="flex justify-center p-2">
            <Button className="w-42" onClick={() => setIsModalOpen(true)}>
              Add opinion
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-grow rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default User;
