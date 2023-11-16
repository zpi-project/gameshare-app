import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/User";
import { OpinionApi } from "@/api/OpinionApi";
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
      isMyPage ? OpinionApi.getAll(0, 100) : OpinionApi.getAllByUUID(user?.uuid ?? "", 0, 100),
    enabled: user !== undefined,
  });

  return (
    <ScrollArea className="w-full">
      {user && (
        <>
          <div className="flex h-full w-full flex-col gap-4 p-4">
            {isLoading ? (
              <div className="flex flex-col gap-4 pr-4">
                {Array.from({ length: 2 }).map(() => (
                  <Skeleton className="h-[132px] rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <h3 className="mt-2 text-center text-xl text-destructive">
                {t("errorFetchingGames")}
              </h3>
            ) : (
              opinions && (
                <>
                  {opinions.results.length ? (
                    opinions?.results.map((opinion, id) => <Opinion opinion={opinion} key={id} />)
                  ) : (
                    <h4 className="mt-4 text-center text-xl">
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
