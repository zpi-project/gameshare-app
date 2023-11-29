import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Check } from "lucide-react";
import { Game } from "@/types/Game";
import { GameApi } from "@/api/GameApi";
import { TimeBadge, PlayersBadge, AgeBadge } from "@/components/Badge";
import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface GameRequestProps {
  game: Game;
}

const GameRequest: FC<GameRequestProps> = ({ game }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: accept, isLoading: isAcceptLoading } = useMutation({
    mutationFn: () => GameApi.accept(game.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["game-requests"]);
      toast({
        title: t("gameAcceptSuccess", { title: game.name }),
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("gameAcceptError"),
        description: t("gameAcceptErrorDescription", { title: game.name }),
      });
    },
  });

  const { mutate: reject, isLoading: isRejectLoading } = useMutation({
    mutationFn: () => GameApi.reject(game.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["game-requests"]);
      toast({
        title: t("gameRejectSuccess", { title: game.name }),
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("gameRejectError", { title: game.name }),
        description: t("gameRejectErrorDescription"),
      });
    },
  });

  return (
    <div className="lex-row flex min-h-[180px] gap-6 rounded-lg bg-card p-4 shadow-lg">
      <div className="max-h-full min-h-full w-[200px] min-w-[200px] overflow-hidden rounded-lg bg-section">
        <img src={game.image} alt={game.name} className="h-full w-full object-cover object-top" />
      </div>
      <div className="flex flex-grow flex-col gap-2">
        <div className="flex flex-row flex-wrap gap-4">
          <h1 className="mr-auto text-xl font-bold xl:text-2xl">{game.name}</h1>
          <Button
            onClick={() => accept()}
            variant="secondary"
            className="flex flex-row items-center gap-2"
          >
            <p className="uppercase">{t("accept")}</p>
            <Check size={20} />
          </Button>
          <Button
            onClick={() => reject()}
            variant="destructive"
            className="flex flex-row items-center gap-2"
          >
            <p className="uppercase">{t("reject")}</p>
            <X size={20} />
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-row flex-wrap gap-1">
          {game.categories.map(({ id, name }) => (
            <Badge key={id} className="text-sm">
              {name}
            </Badge>
          ))}
        </div>
        <p className="break-words p-2 text-justify italic">{game.shortDescription}</p>
        <div className="flex flex-row flex-wrap gap-1">
          <TimeBadge time={game.playingTime} />
          <PlayersBadge minPlayers={game.minPlayers} maxPlayers={game.maxPlayers} />
          <AgeBadge age={game.age} />
        </div>
      </div>
      {(isAcceptLoading || isRejectLoading) && <Spinner />}
    </div>
  );
};

export default GameRequest;
