import { FC } from "react";
import { StarIcon } from "lucide-react";

interface Props {
  count: number;
  variant?: "primary" | "secondary";
}

const Stars: FC<Props> = ({ count, variant = "primary" }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star variant={variant} key={idx} filled={idx < count} />
      ))}
    </div>
  );
};

export default Stars;

interface StarProps {
  filled: boolean;
  variant?: "primary" | "secondary";
}

const Star: FC<StarProps> = ({ filled, variant = "primary" }) => {
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
      className="transition-all duration-200"
    />
  );
};
