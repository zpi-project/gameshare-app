import { FC } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { Map, LocationButton, LocationMarker } from "@/components/Map";

const Dashboard: FC = () => {
  const [location, setLocation] = useRecoilState(locationState);

  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow overflow-hidden rounded-lg bg-section">
        <Map autolocate location={location} setLocation={setLocation}>
          <LocationButton />
          <LocationMarker />
        </Map>
      </div>
      <div className="w-[550px] rounded-lg bg-section p-4">space for search games</div>
    </div>
  );
};

export default Dashboard;
