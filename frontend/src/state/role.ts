import { atom } from "recoil";
import { RoleType } from "@/types/Role";

export const roleState = atom<RoleType>({
  key: "role",
  default: "guest",
});
