import { FC } from "react";
import { Star as StarIcon } from "lucide-react";

interface Props {
  filled: boolean;
}

const Star: FC<Props> = ({ filled }) => {
  return (
    <StarIcon
      size={24}
      color="hsl(var(--primary))"
      fill={filled ? "hsl(var(--primary))" : "hsl(var(--card))"}
    />
  );
};

export default Star;
