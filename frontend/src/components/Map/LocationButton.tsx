import { FC } from "react";
import { useGeolocated } from "react-geolocated";
import { useMapEvents } from "react-leaflet";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@radix-ui/react-tooltip";
import { t } from "i18next";
import { LocateOff, LocateFixed } from "lucide-react";

const LocationButton: FC = () => {
  const { isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const disabled = !isGeolocationAvailable || !isGeolocationEnabled;

  const map = useMapEvents({});

  const onClick = () => {
    map.locate();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="absolute right-3 top-20 z-[11]"
          onClick={onClick}
          disabled={disabled}
        >
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-background text-foreground outline outline-2 outline-black/20">
            {isGeolocationEnabled && isGeolocationAvailable ? (
              <LocateFixed size={20} />
            ) : (
              <LocateOff size={20} />
            )}
          </div>
        </TooltipTrigger>
        {disabled && (
          <TooltipContent className="absolute right-0 top-8 z-[1000] w-52 rounded-md bg-secondary p-2 text-sm shadow">
            <p>
              {!isGeolocationAvailable
                ? t("locationNotAvailableTooltip")
                : !isGeolocationEnabled && t("locationDisabledTooltip")}
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default LocationButton;
