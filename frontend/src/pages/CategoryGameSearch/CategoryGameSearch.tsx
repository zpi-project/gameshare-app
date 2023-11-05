import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import { stringToHexColor } from "@/utils/stringToColor";
import GameSearchBar from "@/components/GameSearchBar";

const category = "Collectible Components";

const CategoryGameSearch: FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const color = stringToHexColor(category);

  return (
    <div className="relative h-full w-full rounded-lg bg-section p-8">
      <div
        className="absolute left-4 right-4 top-4 h-1/2 rounded-lg p-4 opacity-20"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, ${color} 100%)`,
        }}
      />
      <header className="flex w-full flex-grow flex-row justify-between">
        <h1>{category}</h1>
        <GameSearchBar
          onGameClick={(game: Game) => navigate(`${URLS.GAMES}/${game.id}`)}
          placeholder={t("searchGameWithinCategoryPlaceholder")}
        />
      </header>
    </div>
  );
};

export default CategoryGameSearch;
