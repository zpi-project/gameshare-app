import { FC } from "react";
import Spinner from "@/components/ui/Spinner";

const Dashboard: FC = () => {
  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow rounded-lg bg-section p-4">space for map</div>
      <div className="w-[550px] rounded-lg bg-section p-4">space for search games</div>
      <Spinner />
    </div>
  );
};

export default Dashboard;
