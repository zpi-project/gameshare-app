import { FC } from "react";
import { Baby } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AgeBadgeProps {
  age: number;
}

const AgeBadge: FC<AgeBadgeProps> = ({ age }) => {
  return (
    <Badge variant="secondary" className="flex w-max flex-row gap-1">
      <Baby size={20} />
      <span className="tracking-wider">+{age}</span>
    </Badge>
  );
};

export default AgeBadge;
