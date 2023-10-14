import { User } from "@/types/User";

export const getFullname = ({ firstname, lastname }: User) => `${firstname} ${lastname}`;

export const getNameFirstLetters = ({ firstname, lastname }: User) =>
  `${firstname[0] || ""}${lastname[0] || ""}`;

export const hasName = ({ firstname, lastname }: User) => firstname.length + lastname.length > 0;
