import { FC } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimeBadgeProps {
  time: number;
}

const TimeBadge: FC<TimeBadgeProps> = ({ time }) => {
  return (
    <Badge variant="secondary" className="flex flex-row gap-1">
      <Clock size={20} />
      <span className="tracking-wider">{time}'</span>
    </Badge>
  );
};

export default TimeBadge;
