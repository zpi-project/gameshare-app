import { FC, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, ZoomControl, useMapEvents } from "react-leaflet";
import { LatLngExpression, LocationEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { locationState } from "@/state/location";
import { registerFormOpenState } from "@/state/registerForm";
import "./Map.css";


const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapProps {
  location: LatLngExpression;
  children?: JSX.Element | JSX.Element[];
  isMainMap?: boolean;
  autolocate?: boolean;
}

const Map: FC<MapProps> = props => {
  const setLocation = useSetRecoilState(locationState);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationAvailable && coords && props.autolocate) {
      setLocation([coords.latitude, coords.longitude]);
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  return (
    <>
      <MapContainer center={props.location} zoom={15} scrollWheelZoom={true} zoomControl={false}>
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
      setLocation([e.latlng.lat, e.latlng.lng]);
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