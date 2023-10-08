import { Role } from "@typeDefs/Role";
import { atom } from "recoil";

export const roleState = atom<Role>({
  key: "role",
  default: "guest",
});
