import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { User2 } from "lucide-react";
interface PlayersBadgeProps {
  maxPlayers: number;
  minPlayers: number;
}

const PlayersBadge: FC<PlayersBadgeProps> = ({ minPlayers, maxPlayers }) => {
    return <Badge variant="secondary" className="flex flex-row gap-1">
        <User2 size={20} />
        <span className="tracking-wider">{minPlayers}-{maxPlayers}</span>
  </Badge>;
};

export default PlayersBadge;
