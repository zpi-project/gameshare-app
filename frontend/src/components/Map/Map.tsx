import { FC } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilValue } from "recoil";
import { locationState } from "@/state/userLocation";
import GeolocationButton from "./GeolocationButton";
import "./Map.css";

const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapProps {
  geolocationButton: boolean;
}

const Map: FC<MapProps> = ({ geolocationButton }) => {
  const location = useRecoilValue(locationState);

  return (
    <>
      <MapContainer center={location} zoom={15} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer attribution={attribution} url={URL} />
        <ZoomControl position="topright" />
        {geolocationButton && <GeolocationButton />}
      </MapContainer>
    </>
  );
};

export default Map;
