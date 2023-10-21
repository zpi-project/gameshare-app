import { FC } from "react";
import { useGeolocated } from "react-geolocated";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@radix-ui/react-tooltip";
import { LocateOff, LocateFixed } from "lucide-react";

const GeolocationButton: FC = () => {
  //   const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
  // positionOptions: {
  //   enableHighAccuracy: false,
  // },
  // userDecisionTimeout: 5000,
  //   });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button className="h-[30px] w-[30px] bg-background text-foreground"></button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GeolocationButton;
