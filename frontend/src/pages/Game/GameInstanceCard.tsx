import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import { GameInstanceDetails } from "@/types/GameInstance";
import { UserApi } from "@/api/UserApi";
import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import { Badge } from "@/components/ui/badge";

interface GameInstanceCardProps {
  gameInstance: GameInstanceDetails;
  setActive: (uuid: string) => void;
}

const GameInstanceCard: FC<GameInstanceCardProps> = ({
  gameInstance: {
    uuid,
    pricePerDay,
    images,
    description,
    game: { name, image, id: gameId },
    avgRating,
    opinionsAmount,
    owner: { uuid: ownerUUID },
  },
  setActive,
}) => {
  const instanceImage = images[0]?.link ?? image;
  const { t } = useTranslation();
  const role = useRecoilValue(roleState);

  const { data: myUser } = useQuery({
    queryKey: ["user"],
    queryFn: UserApi.get,
    enabled: role !== "guest",
  });

  const isMyGame = myUser?.uuid === ownerUUID;

  return (
    <Link
      className="flex w-full flex-row gap-4 rounded-lg bg-card p-3 hover:bg-accent"
      to={`${URLS.GAMES}/${gameId}/${uuid}`}
      onMouseEnter={() => setActive(ownerUUID)}
      onMouseLeave={() => setActive("")}
    >
      <div className="relative h-32 w-32 rounded-lg">
        <div className="h-32 w-32 overflow-hidden rounded-lg">
          <img
            src={instanceImage}
            alt={`${name} image`}
            className="h-full w-full object-cover object-top"
          />
        </div>
        {isMyGame && <Badge className="absolute -left-0.5 -top-0.5 shadow-md">{t("myGame")}</Badge>}
      </div>
      <section className="flex w-[calc(100%-140px)] flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold text-primary">{name}</h3>
          {opinionsAmount > 0 ? (
            <div className="flex flex-row gap-2">
              <p className="text-base tracking-widest text-foreground">({opinionsAmount})</p>
              <Stars count={Math.round(avgRating)} variant="secondary" />
            </div>
          ) : (
            <Badge variant="secondary" className="w-max px-3 py-1">
              {t("noOpinions")}
            </Badge>
          )}
        </div>
        <PriceBadge price={pricePerDay} />
        <p className="line-clamp-3 break-all text-sm italic">{description}</p>
      </section>
    </Link>
  );
};

export default GameInstanceCard;
