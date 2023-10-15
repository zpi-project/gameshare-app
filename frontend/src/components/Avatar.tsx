import { FC } from "react";
import { Avatar as UiAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types/User";
import { cn } from "@/utils/tailwind";
import { hasName, getNameFirstLetters } from "@/utils/user";
import { User as UserIcon } from "lucide-react";

interface AvatarProps {
  user?: User;
  className?: string;
  iconClassName?: string;
}

const Avatar: FC<AvatarProps> = ({ user, className = "", iconClassName = "" }) => {
  return (
    <UiAvatar className={cn("", className)}>
      <AvatarImage alt="user avatar" src="" />
      {user && hasName(user) ? (
        <AvatarFallback>{getNameFirstLetters(user)}</AvatarFallback>
      ) : (
        <UserIcon
          className={cn(
            "flex h-full w-full items-center justify-center stroke-1 p-2 transition-all duration-300",
            iconClassName,
          )}
        />
      )}
    </UiAvatar>
  );
};

export default Avatar;
