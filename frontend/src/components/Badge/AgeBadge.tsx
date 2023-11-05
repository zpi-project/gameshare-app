import { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface AgeBadgeProps {
  age: number;
}

const AgeBadge: FC<AgeBadgeProps> = ({ age }) => {
  return <Badge variant="secondary">AgeBadge</Badge>;
};

export default AgeBadge;
