import { FC, createContext, useContext, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, ZoomControl, useMapEvents } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { LatLngExpression, LocationEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { UserApi } from "@/api/UserApi";
import "./Map.css";

const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapContextProps {
  location: LatLngExpression;
  setLocation?: (location: LatLngExpression) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
};

interface MapProps {
  location: LatLngExpression;
  setLocation?: (location: LatLngExpression) => void;
  children?: JSX.Element | JSX.Element[];
  autolocate?: boolean;
}

const Map: FC<MapProps> = props => {
  const { autolocate, setLocation, location } = props;
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const role = useRecoilValue(roleState);
  const token = useRecoilValue(tokenState);

  const { data: user } = useQuery({
    queryKey: ["user", { token }],
    queryFn: UserApi.get,
    enabled: role !== "guest",
  });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationAvailable && coords && autolocate) {
      setLocation && setLocation([coords.latitude, coords.longitude]);
    } else {
      if (user) {
        setLocation && setLocation([user.locationLatitude, user.locationLongitude]);
      }
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords, autolocate, user, setLocation]);

  return (
    <MapContext.Provider value={{ location, setLocation }}>
      <MapContainer center={location} zoom={15} scrollWheelZoom={true} zoomControl={false}>
        <MapContent {...props} />
      </MapContainer>
    </MapContext.Provider>
  );
};

export default Map;

interface MapContentProps {
  children?: JSX.Element | JSX.Element[];
}

const MapContent: FC<MapContentProps> = ({ children }) => {
  const { location, setLocation } = useMapContext();
  const map = useMapEvents({
    locationfound(e: LocationEvent) {
      setLocation && setLocation([e.latlng.lat, e.latlng.lng]);
    },
  });

  useEffect(() => {
    map.flyTo(location, map.getZoom());
  }, [location, map]);

  return (
    <>
      <TileLayer attribution={attribution} url={URL} data-test="tile-layer" />
      <ZoomControl position="topright" />
      {children}
    </>
  );
};
