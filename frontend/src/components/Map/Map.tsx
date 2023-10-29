import { FC, createContext, useContext, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, ZoomControl, useMapEvents } from "react-leaflet";
import { LatLngExpression, LocationEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapContextProps {
  location: LatLngExpression;
  setLocation: (location: LatLngExpression) => void;
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
  setLocation: (location: LatLngExpression) => void;
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

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationAvailable && coords && autolocate) {
      setLocation([coords.latitude, coords.longitude]);
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords, autolocate]);

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
      setLocation([e.latlng.lat, e.latlng.lng]);
    },
  });

  useEffect(() => {
    map.flyTo(location, map.getZoom());
  }, [location]);

  return (
    <>
      <TileLayer attribution={attribution} url={URL} />
      <ZoomControl position="topright" />
      {children}
    </>
  );
};
