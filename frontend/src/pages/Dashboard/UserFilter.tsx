import { FC } from "react";
import { User } from "@/types/User";

interface UserFilterProps {
  user: User;
}

const UserFilter: FC<UserFilterProps> = ({ user }) => {
  return <div>UserFilter</div>;
};

export default UserFilter;
