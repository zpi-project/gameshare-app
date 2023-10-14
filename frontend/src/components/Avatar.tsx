import { FC } from "react";
import { Avatar as UiAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types/User";
import { hasName, getNameFirstLetters } from "@/utils/user";
import { User as UserIcon } from "lucide-react";

interface AvatarProps {
  user?: User;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ user, className }) => {
  return (
    <UiAvatar className={className ?? ""} data-test="avatar">
      <AvatarImage alt="user avatar" src="" />
      {user && hasName(user) ? (
        <AvatarFallback>{getNameFirstLetters(user)}</AvatarFallback>
      ) : (
        <UserIcon
          className="flex h-full w-full items-center justify-center  bg-primary stroke-1 p-2 transition-all duration-300"
          data-test="user-icon"
        />
      )}
    </UiAvatar>
  );
};

export default Avatar;
