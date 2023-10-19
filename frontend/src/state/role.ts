import { atom } from "recoil";
import { Role } from "@/types/Role";

export const roleState = atom<Role>({
  key: "role",
  default: "guest",
});
