import { FC } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const DEFAULT_POSITION = [51.11004803480332, 17.058490735381543] as LatLngExpression;
const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: FC = () => {
  return (
    <>
      <MapContainer center={DEFAULT_POSITION} zoom={15} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer attribution={attribution} url={URL} />
        <ZoomControl position="topright" />
      </MapContainer>
    </>
  );
};

export default Map;
