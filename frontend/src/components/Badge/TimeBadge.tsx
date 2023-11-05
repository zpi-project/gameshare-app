import { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface TimeBadgeProps {
  time: number;
}

const TimeBadge: FC<TimeBadgeProps> = ({ time }) => {
  return <Badge variant="secondary">AgeBadge</Badge>;
};

export default TimeBadge;
