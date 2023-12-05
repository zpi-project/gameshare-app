import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Opinion as OpinionType } from "@/types/Opinion";
import { getFullname } from "@/utils/user";
import Avatar from "@/components/Avatar";
import { Stars } from "@/components/Stars";

interface Props {
  opinion: OpinionType;
}

const Opinion: FC<Props> = ({ opinion }) => {
  const [showAll, setshowAll] = useState(false);
  const { t } = useTranslation();
  const handleClick = () => setshowAll(!showAll);

  return (
    <div
      className="flex w-full flex-row items-center gap-3 rounded-lg bg-card p-4"
      data-test="opinion"
    >
      <Avatar user={opinion.ratingUser} className="h-16 w-16" />
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row gap-2">
            <p className="text-lg text-primary" data-test="fullname">
              {getFullname(opinion.ratingUser)}
            </p>
            <p className="text-lg font-thin opacity-80" data-test="dateformat">
              ({t("dateFormat", { date: new Date(opinion.timestamp) })})
            </p>
          </div>
          <Stars count={opinion.stars} />
        </div>
        <div className="min-h-8 break-all pr-2 text-xs italic" data-test="description">
          {showAll ? (
            <>
              {opinion.description}
              <button
                className="mx-2 inline text-xs italic text-secondary"
                onClick={handleClick}
                data-test="see-less"
              >
                {t("seeLess")}
              </button>
            </>
          ) : (
            <>
              {opinion.description.slice(0, 200)}
              {opinion.description.length > 200 && (
                <>
                  <span dadta-test="ellipsis">... </span>
                  <button
                    className="mx-2 inline text-xs italic text-secondary"
                    onClick={handleClick}
                    data-test="see-more"
                  >
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
