import { FC, useState } from "react";
import Star from "./Star";

interface Props {
  count: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: "primary" | "secondary";
}

const Stars: FC<Props> = ({ count, onMouseEnter, onMouseLeave, variant = "primary" }) => {
  const [hoveredCount, setHoveredCount] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          variant={variant}
          key={idx}
          filled={idx < (hoveredCount ?? count)}
          onMouseEnter={() => setHoveredCount(idx + 1)}
          onMouseLeave={() => setHoveredCount(null)}
        />
      ))}
    </div>
  );
};

export default Stars;
