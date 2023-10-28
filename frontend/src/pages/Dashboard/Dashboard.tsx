import { FC } from "react";
import { useRecoilValue } from "recoil";
import { locationState } from "@/state/location";
import { Map, LocationButton, LocationMarker } from "@/components/Map";

const Dashboard: FC = () => {
  const location = useRecoilValue(locationState);

  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow overflow-hidden rounded-lg bg-section">
        <Map isMainMap autolocate location={location}>
          <LocationButton />
          <LocationMarker />
        </Map>
      </div>
      <div className="w-[550px] rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default Dashboard;
