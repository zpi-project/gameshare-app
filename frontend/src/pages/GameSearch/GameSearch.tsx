import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import { Game } from "@/types/Game";
import useIsDesktop from "@/utils/useIsDesktop";
import AddGameForm from "@/components/AddGameForm";
import AddGameFormMobile from "@/components/AddGameFormMobile";
import { GameSearchBar } from "@/components/GameSearch";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesSection from "./CategoriesSection";
import PopularGamesSection from "./PopularGamesSection";
import RecommendedGamesSection from "./RecommendedGamesSection";

const GameSearch: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = useRecoilValue(roleState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isDesktop = useIsDesktop();

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-section p-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <GameSearchBar
          onGameClick={(game: Game) => navigate(`${URLS.GAMES}/${game.id}`)}
          placeholder={t("searchGamePlaceholder")}
        />
        {role !== "guest" && (
          <Button onClick={() => setIsDialogOpen(true)} className="mr-10 w-full md:w-max">
            {t("addGame")}
          </Button>
        )}
      </div>
      <ScrollArea className="h-full w-full">
        {role !== "guest" && <RecommendedGamesSection />}
        <PopularGamesSection />
        <CategoriesSection />
      </ScrollArea>
      {isDesktop ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AddGameForm close={() => setIsDialogOpen(false)} />
        </Dialog>
      ) : (
        <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AddGameFormMobile close={() => setIsDialogOpen(false)} />
        </Drawer>
      )}
    </div>
  );
};

export default GameSearch;
