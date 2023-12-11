import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/User";
import { UserApi } from "@/api/UserApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Opinion from "./Opinion";

interface Props {
  isMyPage?: boolean;
  user?: User;
}

const Opinions: FC<Props> = ({ isMyPage, user }) => {
  const { t } = useTranslation();
  const {
    data: opinions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["opinions", { uuid: user?.uuid }],
    queryFn: () =>
      isMyPage
        ? UserApi.getMyOpinions(0, 100)
        : UserApi.getAllOpinionsByUUID(user?.uuid ?? "", 0, 100),
    enabled: user !== undefined,
  });

  return (
    <ScrollArea className="w-full">
      {user && (
        <>
          <div className="flex h-full w-full flex-col gap-4 p-4" data-test="opinions-section">
            {isLoading ? (
              <div className="flex flex-col gap-4 pr-4" data-test="loading-opinions">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton className="h-[132px] rounded-lg" key={idx} />
                ))}
              </div>
            ) : isError ? (
              <h3 className="mt-2 text-center text-xl text-destructive" data-test="error-message">
                {t("errorFetchingOpinions")}
              </h3>
            ) : (
              opinions && (
                <>
                  {opinions.results.length ? (
                    opinions?.results.map((opinion, id) => <Opinion opinion={opinion} key={id} />)
                  ) : (
                    <h4 className="mt-4 text-center text-xl" data-test="no-opinions">
                      {t(isMyPage ? "noOpinionsMyPage" : "noOpinionsUserPage")}
                    </h4>
                  )}
                </>
              )
            )}
          </div>
        </>
      )}
    </ScrollArea>
  );
};

export default Opinions;
