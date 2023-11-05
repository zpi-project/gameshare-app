import { FC } from "react";
import GameSearchBar from "@/components/GameSearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesSection from "./CategoriesSection";
import PopularGamesSection from "./PopularGamesSection";

const GameSearch: FC = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-section p-4">
      <GameSearchBar onGameClick={() => null} />
      <ScrollArea className="h-full w-full">
        <PopularGamesSection />
        <CategoriesSection />
      </ScrollArea>
    </div>
  );
};

export default GameSearch;
