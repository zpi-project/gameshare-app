import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesSection from "./CategoriesSection";
import GameSearchBar from "./GameSearchBar";
import PopularGamesSection from "./PopularGamesSection";

const GameSearch: FC = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-section p-4">
      <GameSearchBar />
      <ScrollArea className="h-full w-full">
        <PopularGamesSection />
        <CategoriesSection />
      </ScrollArea>
    </div>
  );
};

export default GameSearch;
