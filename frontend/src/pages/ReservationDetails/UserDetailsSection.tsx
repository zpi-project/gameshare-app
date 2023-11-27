import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { parsePhoneNumber } from "libphonenumber-js";
import { URLS } from "@/constants/urls";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import Avatar from "@/components/Avatar";
import { Stars } from "@/components/Stars";

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
        <Avatar user={user} className="h-20 w-20 lg:h-[148px] lg:w-[148px] lg:text-5xl" />
        <div className="flex w-full flex-grow flex-col gap-4 xl:gap-6">
          <p className="w-full rounded-lg bg-background p-2 px-4 text-lg xl:text-center">
            {getFullname(user)}
          </p>
          <p className="w-full rounded-lg bg-background p-2 px-4 text-lg xl:text-center">
            {user.phoneNumber && parsePhoneNumber(user.phoneNumber).formatInternational()}
          </p>
          <div className="flex w-full rounded-lg bg-background p-2 px-4 text-lg xl:justify-center">
            {user.avgRating > 0 ? <Stars count={Math.round(user.avgRating)} /> : t("noOpinions")}
          </div>
          <Link
            className="ml-auto rounded-lg bg-primary px-8 py-2 duration-200 hover:bg-accent"
            to={`${URLS.PROFILE}/${user.uuid}`}
          >
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSection;
