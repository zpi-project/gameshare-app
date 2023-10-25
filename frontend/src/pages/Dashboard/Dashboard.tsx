import { FC } from "react";
import { Map, LocationButton, LocationMarker } from "@/components/Map";

const Dashboard: FC = () => {
  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow overflow-hidden rounded-lg bg-section">
        <Map isMainMap>
          <LocationButton />
          <LocationMarker />
        </Map>
      </div>
      <div className="w-[550px] rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default Dashboard;
