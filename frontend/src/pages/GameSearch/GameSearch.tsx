import { FC } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CategoriesSection from "./CategoriesSection";
import GameSearchBar from "./GameSearchBar";
import PopularGamesSection from "./PopularGamesSection";

const GameSearch: FC = () => {
  return (
    <div className="v-full flex h-full flex-col gap-4 rounded-lg bg-section p-4">
      <GameSearchBar />
      <ScrollArea className="h-full">
        <PopularGamesSection />
        <CategoriesSection />
      </ScrollArea>
    </div>
  );
};

export default GameSearch;
