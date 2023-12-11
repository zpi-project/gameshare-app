import { FC } from "react";
import { Baby } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AgeBadgeProps {
  age: number;
}

const AgeBadge: FC<AgeBadgeProps> = ({ age }) => {
  return (
    <Badge variant="secondary" className="flex w-max flex-row gap-1" data-test="age-badge">
      <Baby size={20} data-test="baby-icon" />
      <span className="tracking-wider" data-test="age">
        +{age}
      </span>
    </Badge>
  );
};

export default AgeBadge;
