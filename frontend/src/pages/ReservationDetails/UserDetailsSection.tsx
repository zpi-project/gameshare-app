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
      <div className="flex flex-col items-center gap-4 px-4">
        <Avatar user={user} className="h-[148px] w-[148px]" />
        <p className="w-full rounded-lg bg-card p-2 text-center text-lg">{getFullname(user)}</p>
        <p className="w-full rounded-lg bg-card p-2 text-center text-lg">
          {user.phoneNumber && parsePhoneNumber(user.phoneNumber).formatInternational()}
        </p>
        <p className="w-full rounded-lg bg-card p-2 text-center text-lg">
          {user.avgRating > 0 ? <Stars count={Math.round(user.avgRating)} /> : t("noOpinions")}
        </p>
        <Button className="ml-auto px-8">{btnText}</Button>
      </div>
    </div>
  );
};

export default UserDetailsSection;
