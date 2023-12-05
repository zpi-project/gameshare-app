import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import AddGameForm from "@/components/AddGameForm";
import { GameSearchBar } from "@/components/GameSearch";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesSection from "./CategoriesSection";
import PopularGamesSection from "./PopularGamesSection";
import RecommendedGamesSection from "./RecommendedGamesSection";

const GameSearch: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = useRecoilValue(roleState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-section p-4">
      <div className="flex flex-row justify-between">
        <GameSearchBar
          onGameClick={(game: Game) => navigate(`${URLS.GAMES}/${game.id}`)}
          placeholder={t("searchGamePlaceholder")}
        />
        {role !== "guest" && (
          <Button onClick={() => setIsDialogOpen(true)} className="mr-10">
            {t("addGame")}
          </Button>
        )}
      </div>
      <ScrollArea className="h-full w-full">
        {role !== "guest" && <RecommendedGamesSection />}
        <PopularGamesSection />
        <CategoriesSection />
      </ScrollArea>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AddGameForm close={() => setIsDialogOpen(false)} />
      </Dialog>
    </div>
  );
};

export default GameSearch;
