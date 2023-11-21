import { FC, useState } from "react";
import { Star as StarIcon } from "lucide-react";

interface Props {
  variant?: "primary" | "secondary";
}

const StarsInput: FC<Props> = ({ variant = "primary" }) => {
  const [clickedCount, setClickedCount] = useState<number>(0);
  const [hoveredCount, setHoveredCount] = useState<number>(clickedCount);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          variant={variant}
          key={idx}
          filled={idx < hoveredCount}
          onMouseEnter={() => setHoveredCount(idx + 1)}
          onMouseLeave={() => setHoveredCount(clickedCount)}
          onClick={() => setClickedCount(idx + 1)}
        />
      ))}
    </div>
  );
};

export default StarsInput;

interface StarProps {
  filled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const Star: FC<StarProps> = ({
  filled,
  variant = "primary",
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <StarIcon
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
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
