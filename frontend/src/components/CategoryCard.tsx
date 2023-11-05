import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Category } from "@/types/Category";
import { stringToRGBColor } from "@/utils/stringToColor";
import { useTheme } from "./ThemeProvider";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: FC<CategoryCardProps> = ({ category: { name, id } }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Link
      to={`${URLS.CATEGORY_GAMES}/${id}`}
      className="h-48 w-48 rounded-lg bg-card p-4 shadow duration-300 hover:bg-background hover:bg-opacity-50"
      style={{
        backgroundColor:
          color === "dark"
            ? stringToRGBColor(name, isHovered ? 0.5 : 0.4, isHovered ? 0.4 : 0.2)
            : stringToRGBColor(name, isHovered ? 0.3 : 0.5, isHovered ? 0.5 : 0.7),
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <p className="font-bold">{name}</p>
    </Link>
  );
};

export default CategoryCard;
