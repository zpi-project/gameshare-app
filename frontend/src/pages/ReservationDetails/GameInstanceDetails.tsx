import { GameInstanceDetails } from "@/types/GameInstance";
import { FC } from "react";


interface GameInstanceDetailsProps {
  gameInstance: GameInstanceDetails
}

const GameInstanceDetails: FC<GameInstanceDetailsProps> = ({ gameInstance }) => {
  return <div>GameDetails</div>;
};

export default GameInstanceDetails;