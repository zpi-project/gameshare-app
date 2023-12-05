import { FC } from "react";
import { Opinion } from "@/types/Opinion";
import { Stars } from "@/components/Stars";

interface OpinionProps {
  opinion: Opinion | null;
  opinionHeader: string;
  noOpinionMessage: string;
}

const OpinionSection: FC<OpinionProps> = ({ opinion, opinionHeader, noOpinionMessage }) => {
  return (
    <div className="flex flex-grow flex-col gap-4 rounded-lg bg-section p-8">
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <h3 className="text-xl uppercase">{opinionHeader}</h3>
        {opinion && opinion.stars > 0 && <Stars count={opinion.stars} variant="secondary" />}
      </div>
      <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
        {opinion ? opinion.description : noOpinionMessage}
      </p>
    </div>
  );
};

export default OpinionSection;
