import { FC, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Link } from "react-router-dom";
import { divIcon } from "leaflet";
import { URLS } from "@/constants/urls";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import Stars from "@/components/Stars";

interface UserMarkerProps {
  user: User;
  onClick?: (user: User | null) => void;
  active?: boolean;
}
const UserMarker: FC<UserMarkerProps> = ({ user, onClick, active }) => {
  const [isClicked, setIsClicked] = useState(false);
  console.log(active);
  useMapEvents({
    click(e) {
      const mapContainer = e.target._container;
      const clickedOnMap = e.originalEvent.target === mapContainer;
      if (clickedOnMap && isClicked) {
        setIsClicked(false);
        onClick && onClick(null);
      }
    },
  });

  const { locationLatitude, locationLongitude, avatarLink, avgRating, uuid } = user;

  const pinIcon = divIcon({
    html: `
    <svg width="30" height="48" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="location-marker__svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 52C18 52 36 34.8302 36 18.1509C36 8.12645 27.9411 0 18 0C8.05887 0 0 8.12645 0 18.1509C0 34.8302 18 52 18 52ZM18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z" fill="hsl(var(--secondary))"/>
      <circle cx="18" cy="18" r="12" fill="#fff"/>
      </svg>`,
    className: `location-marker ${active ? "active" : ""}`,
    iconSize: [30, 48],
    iconAnchor: [15, 48],
  });

  return (
    <Marker
      icon={pinIcon}
      position={[locationLatitude, locationLongitude]}
      eventHandlers={{
        click: () => {
          setIsClicked(true);
          onClick && onClick(user);
        },
      }}
    >
      <Popup>
        <div className="z-10 flex flex-row items-center gap-4 rounded-lg bg-background">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <img src={avatarLink} alt={getFullname(user)} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <Link to={`${URLS.PROFILE}/${uuid}`}>
              <h4 className="text-xl font-semibold text-primary duration-200 hover:underline">
                {getFullname(user)}
              </h4>
            </Link>
            {avgRating > 0 && <Stars count={Math.round(avgRating)} size={20} />}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserMarker;
