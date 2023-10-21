import { FC } from "react";
import { useGeolocated } from "react-geolocated";
import Map from "@/components/Map/Map";

const Dashboard: FC = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex-grow overflow-hidden rounded-lg bg-section">
        <Map geolocationButton={true} />
      </div>
      <div className="w-[550px] rounded-lg bg-section p-4">
        space for search games, longitude: {coords?.longitude}, latitude: {coords?.latitude}
      </div>
    </div>
  );
};

export default Dashboard;
