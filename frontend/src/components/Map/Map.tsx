import { FC, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, ZoomControl, useMapEvents } from "react-leaflet";
import { LocationEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState } from "@/state/location";
import LocationButton from "./LocationButton";
import LocationMarker from "./LocationMarker";
import "./Map.css";

const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapProps {
  locationButton: boolean;
  locationMarker: boolean;
}

const Map: FC<MapProps> = props => {
  const [location, setLocation] = useRecoilState(locationState);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationAvailable && coords) {
      setLocation([coords.latitude, coords.longitude]);
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  return (
    <>
      <MapContainer center={location} zoom={15} scrollWheelZoom={true} zoomControl={false}>
        <MapContent {...props} />
      </MapContainer>
    </>
  );
};

export default Map;

const MapContent: FC<MapProps> = ({ locationButton, locationMarker }) => {
  const [location, setLocation] = useRecoilState(locationState);

  const map = useMapEvents({
    locationfound(e: LocationEvent) {
      setLocation(e.latlng);
    },
  });

  useEffect(() => {
    map.flyTo(location, map.getZoom());
  }, [location]);

  return (
    <>
      <TileLayer attribution={attribution} url={URL} />
      <ZoomControl position="topright" />
      {locationButton && <LocationButton />}
      {locationMarker && <LocationMarker />}
    </>
  );
};
