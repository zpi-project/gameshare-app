import { LatLngExpression } from "leaflet";
import { atom } from "recoil";

export const locationState = atom<LatLngExpression>({
  key: "location",
  default: [51.11004803480332, 17.058490735381543] as LatLngExpression,
});
