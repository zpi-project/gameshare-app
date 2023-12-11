import { FC } from "react";
import { User as UserIcon } from "lucide-react";
import { User } from "@/types/User";
import { cn } from "@/utils/tailwind";
import { getNameFirstLetters } from "@/utils/user";
import { Avatar as UiAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarProps {
  user?: User;
  className?: string;
  iconClassName?: string;
  avatarImageClassName?: string;
}

const Avatar: FC<AvatarProps> = ({ user, className, iconClassName, avatarImageClassName }) => {
  return (
    <UiAvatar className={cn("", className)}>
      {user !== undefined ? (
        <>
          <AvatarImage
            alt="user avatar"
            src={user.avatarLink}
            data-test="user-image"
            className={cn("", avatarImageClassName)}
          />
          <AvatarFallback data-test="user-image">{getNameFirstLetters(user)}</AvatarFallback>
        </>
      ) : (
        <UserIcon
          data-test="guest-image"
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
