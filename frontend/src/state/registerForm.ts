import { atom } from "recoil";

export const registerFormOpenState = atom<boolean>({
  key: "registerFormOpen",
  default: false,
});
