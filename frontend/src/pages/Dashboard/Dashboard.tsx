import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow rounded-lg bg-section p-4">space for map</div>
      <div className="w-[550px] rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default Dashboard;
