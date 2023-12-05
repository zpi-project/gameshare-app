import { atom } from "recoil";

export const isRoleFetchedState = atom<boolean>({
  key: "role-loading",
  default: false,
});
