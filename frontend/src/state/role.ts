import { Role } from "@/types/Role";
import { atom } from "recoil";

export const roleState = atom<Role>({
  key: "role",
  default: "guest",
});
