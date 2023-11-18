import { FC } from "react";
import { GameInstance } from "@/types/GameInstance";

interface GameInstanceDetailsCardProps {
  gameInstance: GameInstance;
}

const GameInstanceDetailsCard: FC<GameInstanceDetailsCardProps> = ({ gameInstance }) => {
  return <div>GameInstanceDetailsCard</div>;
};

export default GameInstanceDetailsCard;
