import { FC } from "react";
import { Star as StarIcon } from "lucide-react";

interface Props {
  filled: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: "primary" | "secondary";
}

const Star: FC<Props> = ({ filled, variant = "primary" }) => {
  return (
    <StarIcon
      size={24}
      color={variant == "primary" ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
      fill={
        filled
          ? variant == "primary"
            ? "hsl(var(--primary))"
            : "hsl(var(--secondary))"
          : "hsl(var(--card))"
      }
    />
  );
};

export default Star;
