import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { parsePhoneNumber } from "libphonenumber-js";
import { URLS } from "@/constants/urls";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  user?: User;
  isLoading: boolean;
}

const GameInstanceUserDetailsSection: FC<Props> = ({ user, isLoading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center gap-6">
      {isLoading && (
        <div className="flex flex-col gap-6">
          <Skeleton className="h-max-h flex-grow rounded-lg p-5" />
          <Skeleton className="h-10 w-6/12 rounded-lg p-2" />
          <Skeleton className="h-10 w-6/12 rounded-lg p-2" />
        </div>
      )}
      {user && (
        <>
          <div className="flex h-full w-full flex-col items-center gap-6">
            <Avatar user={user} className="h-32 w-32 text-4xl" />
            <h2 className="flex w-5/6 items-center justify-center rounded-lg bg-card p-2">
              {getFullname(user)}
            </h2>
            {user.phoneNumber && (
              <div className="flex w-5/6 items-center justify-center rounded-lg bg-card p-2.5 text-sm xl:text-base">
                {parsePhoneNumber(user.phoneNumber).formatInternational()}
              </div>
            )}
            <Button className="w-1/2" onClick={() => navigate(`${URLS.PROFILE}/${user?.uuid}`)}>
              {t("seeProfile")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInstanceUserDetailsSection;
