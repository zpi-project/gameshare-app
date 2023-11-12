import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Opinion as OpinionType } from "@/types/Opinion";
import { getFullname } from "@/utils/user";
import Avatar from "./Avatar";
import Stars from "./Stars";

interface Props {
  opinion: OpinionType;
}

const Opinion: FC<Props> = ({ opinion }) => {
  const [showAll, setshowAll] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setshowAll(current => !current);
  };

  return (
    <div className="flex w-full flex-row items-center gap-3 rounded-lg bg-card p-4">
      <Avatar user={opinion.ratingUser} className="h-16 w-16" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="text-primary">{getFullname(opinion.ratingUser)}</div>
          <Stars count={opinion.stars} />
        </div>
        <div className="min-h-8 pr-2 text-xs italic">
          {showAll ? (
            opinion.description
          ) : (
            <>
              {opinion.description.slice(0, 200)}
              {opinion.description.length > 200 && (
                <>
                  <span>... </span>
                  <button className="inline text-xs italic text-secondary" onClick={handleClick}>
                    {t("seeMore")}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opinion;
