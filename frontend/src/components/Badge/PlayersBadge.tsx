import { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface PlayersBadgeProps {
  maxPlayers: number;
  minPlayers: number;
}

const PlayersBadge: FC<PlayersBadgeProps> = ({ minPlayers, maxPlayers }) => {
  return <Badge variant="secondary">AgeBadge</Badge>;
};

export default PlayersBadge;
