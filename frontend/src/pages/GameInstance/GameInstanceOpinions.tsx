import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { GameInstanceDetails } from "@/types/GameInstance";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Opinion } from "@/components/Opinions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  gameInstance: GameInstanceDetails;
}

const GameInstanceOpinions: FC<Props> = ({ gameInstance }) => {
  const { t } = useTranslation();
  const {
    data: opinions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["opinions", { uuid: gameInstance?.uuid }],
    queryFn: () => GameInstanceApi.getAllGameInstanceOpinions(gameInstance?.uuid ?? "", 0, 100),
    enabled: gameInstance !== undefined,
  });

  return (
    <ScrollArea className="w-full">
      {gameInstance && (
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
                {t("errorFetchingOpinions")}
              </h3>
            ) : (
              opinions && (
                <>
                  {opinions.results.length ? (
                    opinions?.results.map((opinion, id) => <Opinion opinion={opinion} key={id} />)
                  ) : (
                    <h4 className="mt-4 text-center text-xl">{t("noOpinionsGameInstance")}</h4>
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

export default GameInstanceOpinions;
