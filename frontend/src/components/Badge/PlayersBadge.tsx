import { FC } from "react";
import { User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlayersBadgeProps {
  maxPlayers: number;
  minPlayers: number;
}

const PlayersBadge: FC<PlayersBadgeProps> = ({ minPlayers, maxPlayers }) => {
  return (
    <Badge variant="secondary" className="flex w-max flex-row gap-1">
      <User2 size={20} data-test="user-icon" />
      {minPlayers === maxPlayers ? (
        <span className="tracking-wider" data-test="players-amount">
          {minPlayers}
        </span>
      ) : (
        <span className="tracking-wider" data-test="players-interval">
          {minPlayers}-{maxPlayers}
        </span>
      )}
    </Badge>
  );
};

export default PlayersBadge;
