import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";

interface UserFilterProps {
  user: User;
}

const UserFilter: FC<UserFilterProps> = ({ user }) => {
  const { avatarLink, uuid, avgRating, opinionsAmount } = user;
  const { t } = useTranslation();
  return (
    <Link
      className="flex flex-row items-center gap-4 rounded-lg bg-card p-2"
      to={`${URLS.PROFILE}/${uuid}`}
    >
      <div className="h-12 w-12 overflow-hidden rounded-full">
        <img src={avatarLink} alt={getFullname(user)} className="h-full w-full object-cover" />
      </div>
      <h4 className="text-xl font-semibold text-primary duration-200 hover:underline">
        {getFullname(user)}
      </h4>
      <div className="ml-auto flex flex-row gap-2">
        {opinionsAmount > 0 ? (
          <>
            <p className="text-base tracking-widest text-foreground">({opinionsAmount})</p>
            <Stars count={Math.round(avgRating)} />
          </>
        ) : (
          <Badge className="w-max px-3 py-1 hover:bg-primary">{t("noOpinions")}</Badge>
        )}
      </div>
    </Link>
  );
};

export default UserFilter;
