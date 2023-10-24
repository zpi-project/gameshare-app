import { FC, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { divIcon } from "leaflet";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";

const LocationMarker: FC = () => {
  const [location, setLocation] = useRecoilState(locationState);

  useMapEvents({
    click(e) {
      const mapContainer = e.target._container;
      const clickedOnMap = e.originalEvent.target === mapContainer;

      if (clickedOnMap) {
        setLocation(e.latlng);
      }
    },
  });

  const pinIcon = divIcon({
    html: `
    <svg width="36" height="52" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="location-marker__svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 52C18 52 36 34.8302 36 18.1509C36 8.12645 27.9411 0 18 0C8.05887 0 0 8.12645 0 18.1509C0 34.8302 18 52 18 52ZM18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z" fill="hsl(var(--primary))"/>
      <circle cx="18" cy="18" r="12" fill="#fff"/>
      </svg>`,
    className: "location-marker",
    iconSize: [36, 52],
    iconAnchor: [18, 52],
  });

  return <Marker icon={pinIcon} position={location} />;
};

export default LocationMarker;
