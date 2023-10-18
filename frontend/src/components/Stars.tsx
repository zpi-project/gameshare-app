import { FC } from "react";
import Star from "./Star";

interface Props {
    count: number
}

const Stars: FC<Props> = ({count}) => {
  return (
    <div className="flex gap-1">
    {Array.from({length: 5}).map((_, idx) => <Star key={idx} filled={idx<count}/>)}
    </div>
  );
};

export default Stars;