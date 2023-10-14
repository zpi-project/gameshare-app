import { FC, useState } from "react";
import UserDetails from "@components/UserDetails";
import EditPersonalDataModal from "./EditPersonalDataModal";

const User: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <UserDetails showButton={true} onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <EditPersonalDataModal />}
    </div>
  );
};

export default User;
