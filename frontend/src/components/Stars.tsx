import { FC, useState } from "react";
import Star from "./Star";

// Import the Star component

interface Props {
  count: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Stars: FC<Props> = ({ count, onMouseEnter, onMouseLeave }) => {
  const [hoveredCount, setHoveredCount] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          filled={idx < (hoveredCount ?? count)} // Determine whether the star should be filled based on the hovered count
          onMouseEnter={() => setHoveredCount(idx + 1)} // Set the hovered count when the mouse enters a star
          onMouseLeave={() => setHoveredCount(null)} // Reset the hovered count when the mouse leaves a star
        />
      ))}
    </div>
  );
};

export default Stars;
