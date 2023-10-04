import { atom } from "recoil";
import { Role } from "@typeDefs/Role";

export const roleState = atom<Role>({
  key: "role",
  default: "guest",
});
