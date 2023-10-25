import { FC } from "react";
import { useTranslation } from "react-i18next";
import { parsePhoneNumber } from "libphonenumber-js";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import { Skeleton } from "@/components/ui/skeleton";
import Avatar from "./Avatar";
import { Button } from "./ui/button";

interface Props {
  onClick?: () => void;
  user?: User;
  showEdit: boolean;
  isLoading: boolean;
}

const UserDetails: FC<Props> = ({ onClick, user, showEdit, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col gap-6">
      {isLoading && (
        <>
          <div className="flex w-full flex-row items-center gap-6">
            <Skeleton className="h-40 w-40 rounded-full" />
            <Skeleton className="h-max-h flex-grow rounded-lg p-5" />
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-10 w-6/12 rounded-lg p-2" />
            <Skeleton className="h-10 w-6/12 rounded-lg p-2" />
          </div>
        </>
      )}
      {user && (
        <>
          <div className="flex w-full flex-row items-center gap-6">
            <Avatar user={user} className="h-40 w-40 text-5xl" />
            <div className="h-max-h flex-grow rounded-lg bg-card p-5 text-xl">
              {getFullname(user)}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-max-h w-6/12 rounded-lg bg-card p-2">
              {parsePhoneNumber(user.phoneNumber).formatInternational()}
            </div>
            <div className="flex w-full flex-row justify-between">
              <div className="h-max-h w-6/12 rounded-lg bg-card p-2">
                {user.locationLatitude}, {user.locationLongitude}
              </div>
              {showEdit && (
                <Button onClick={onClick} className="w-32">
                  {t("edit")}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
