import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import GameSearchBar from "@/components/GameSearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesSection from "./CategoriesSection";
import PopularGamesSection from "./PopularGamesSection";

const GameSearch: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-section p-4">
      <GameSearchBar
        onGameClick={(game: Game) => navigate(`${URLS.GAMES}/${game.id}`)}
        placeholder={t("searchGamePlaceholder")}
      />
      <ScrollArea className="h-full w-full">
        <PopularGamesSection />
        <CategoriesSection />
      </ScrollArea>
    </div>
  );
};

export default GameSearch;
