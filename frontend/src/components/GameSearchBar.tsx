import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { GameApi } from "@/api/GameApi";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const GAME_PAGE_SIZE = 8;

interface GameSearchBarProps {
  onGameClick: () => void;
}

const GameSearchBar: FC<GameSearchBarProps> = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const { data: games } = useQuery({
    queryKey: [],
    queryFn: () => GameApi.search(debouncedSearch, 0, GAME_PAGE_SIZE),
    onError: () => {
      console.log("error");
    },
  });
  return (
    <div className="max-w-[700px] relative">
      <Search className="absolute top-2 right-4"/>
      <Input
        placeholder="What board game would you like to play?"
        className="rounded-lg border-none bg-card"
      />
    </div>
  );
};

export default GameSearchBar;