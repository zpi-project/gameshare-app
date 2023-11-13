import { FC } from "react";
import { StarIcon } from "lucide-react";

interface Props {
  count: number;
  variant?: "primary" | "secondary";
  size?: number;
}

const Stars: FC<Props> = ({ count, variant = "primary", size = 24 }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star variant={variant} key={idx} filled={idx < count} size={size} />
      ))}
    </div>
  );
};

export default Stars;

interface StarProps {
  filled: boolean;
  variant?: "primary" | "secondary";
  size: number;
}

const Star: FC<StarProps> = ({ filled, variant = "primary", size }) => {
  return (
    <StarIcon
      size={size}
      color={variant == "primary" ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
      fill={
        filled ? (variant == "primary" ? "hsl(var(--primary))" : "hsl(var(--secondary))") : "none"
      }
      className="transition-all duration-200"
    />
  );
};
