import { FC } from "react";
import { useTranslation } from "react-i18next";
import { parsePhoneNumber } from "libphonenumber-js";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import Avatar from "@/components/Avatar";
import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";

interface UserDetailsSectionProps {
  user: User;
  title: string;
  btnText: string;
}

const UserDetailsSection: FC<UserDetailsSectionProps> = ({ user, title, btnText }) => {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full flex-col gap-4">
      <h3 className="text-xl uppercase">{title}</h3>
      <div className="flex gap-6 px-4 xl:flex-col xl:items-center">
        <Avatar user={user} className="h-20 w-20 lg:h-[148px] lg:w-[148px]" />
        <div className="flex w-full flex-grow flex-col gap-4 xl:gap-6">
          <p className="w-full rounded-lg bg-background p-2 px-4 text-lg xl:text-center">
            {getFullname(user)}
          </p>
          <p className="w-full rounded-lg bg-background p-2 px-4 text-lg xl:text-center">
            {user.phoneNumber && parsePhoneNumber(user.phoneNumber).formatInternational()}
          </p>
          <p className="flex w-full rounded-lg bg-background p-2 px-4 text-lg xl:justify-center">
            {user.avgRating > 0 ? <Stars count={Math.round(user.avgRating)} /> : t("noOpinions")}
          </p>
          <Button className="ml-auto px-8">{btnText}</Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSection;
