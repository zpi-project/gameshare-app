import { FC, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, ZoomControl, useMapEvents } from "react-leaflet";
import { LocationEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState } from "@/state/location";
import { registerFormOpenState } from "@/state/registerForm";
import "./Map.css";

const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapProps {
  children?: JSX.Element | JSX.Element[];
  isMainMap?: boolean;
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

const MapContent: FC<MapProps> = ({ children, isMainMap }) => {
  const [location, setLocation] = useRecoilState(locationState);
  const registerFormOpen = useRecoilValue(registerFormOpenState);

  const map = useMapEvents({
    locationfound(e: LocationEvent) {
      setLocation(e.latlng);
    },
  });

  useEffect(() => {
    if (!(isMainMap && registerFormOpen)) {
      map.flyTo(location, map.getZoom());
    }
  }, [location]);

  return (
    <>
      <TileLayer attribution={attribution} url={URL} />
      <ZoomControl position="topright" />
      {children}
    </>
  );
};
