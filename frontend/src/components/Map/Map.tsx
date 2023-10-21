import { FC } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilValue } from "recoil";
import { locationState } from "@/state/location";
import "./Map.css";
import LocationButton from "./LocationButton";
import LocationMarker from "./LocationMarker";

const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapProps {
  locationButton: boolean;
  locationMarker: boolean
}

const Map: FC<MapProps> = ({ locationButton, locationMarker }) => {
  const location = useRecoilValue(locationState);

  return (
    <>
      <MapContainer center={location} zoom={15} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer attribution={attribution} url={URL} />
        <ZoomControl position="topright" />
        {locationButton && <LocationButton />}
        {locationMarker && <LocationMarker />}
      </MapContainer>
    </>
  );
};

export default Map;
